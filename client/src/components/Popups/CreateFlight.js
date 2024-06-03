import { togglePopup, setupPopup, closePopup } from './Popup.js';
import axios from "axios";
import { socket } from "../../socket.js";
import { endpoints } from "../../api/index.js";
import { isDataFilled } from "../../utils/isDataFilled.js";
import { getCurrentMonthName } from "../../utils/getCurrentMonthName.js";


$(document).ready(function () {
    setupPopup("#FlightPopup", "#popupCloseButtonCreate");

    $("#createFlightButton").click(function () {
        togglePopup("#FlightPopup");
    });
    const loadSelectOptions = async () => {
        try {
            const airportsRes = await axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.AIRPORTS.ROUTE}${endpoints.AIRPORTS.GET_ALL}`);
            const airports = airportsRes.data.body.sort((a, b) => a.airportName.localeCompare(b.airportName));
            airports.forEach(airport => {
                const option = `<option value="${airport.airportId}">${airport.airportName} - ${airport.airportPlace}</option>`;
                $("#departureAirport, #destinationAirport").append(option);
            });
        } catch {
            toastError("Не удалось загрузить список аэропортов");
        }

        try {
            const planesRes = await axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.PLANES.ROUTE}${endpoints.PLANES.GET_FREE}`);
            const planes = planesRes.data.body;
            planes.forEach(plane => {
                const option = `<option value="${plane.id}">${plane.planeType}</option>`;
                $("#currentPlane").append(option);
            });
        } catch {
            toastError("Не удалось загрузить список доступных самолетов");
        }
    };

    loadSelectOptions();

    $("#createFlightForm").submit(function (e) {
        e.preventDefault();

        const formData = {
            departureAirportId: $("#departureAirport").val(),
            departureAirport: $("#departureAirport option:selected").text(),
            destinationAirportId: $("#destinationAirport").val(),
            destinationAirport: $("#destinationAirport option:selected").text(),
            currentPlaneId: $("#currentPlane").val(),
            currentPlane: $("#currentPlane option:selected").text(),
            flightPrice: $("#flightPrice").val(),
            date: $("#date").val(),
            gate: $("#gate").val(),
            flightTime: $("#flightTime").val()
        };
        if (formData.departureAirportId === formData.destinationAirportId) {
            toastError("Место назначения и вылета одинаковые!");
            $("#destinationAirport").val('');
            return;
        }
        createFlight(formData);
        closePopup("#FlightPopup");
    });
});

async function createFlight(formData) {
    const isFormDataFilled = isDataFilled(formData);

    if (isFormDataFilled) {
        toastError("Кажется, вы что-то не указали");
        return;
    }

    const date = new Date();
    const timestamp = `${date.getDate()} ${getCurrentMonthName(date.getMonth())} ${date.getFullYear()}`;

    const flightDate = formData.date.replaceAll('-', '.');

    try {
        const res = await axios.post('http://localhost:5000/api/flights/create', {
            departureAirportId: formData.departureAirportId,
            departureAirport: formData.departureAirport,
            destinationAirportId: formData.destinationAirportId,
            destinationAirport: formData.destinationAirport,
            planeId: parseInt(formData.currentPlaneId),
            flightPrice: parseInt(formData.flightPrice),
            date: flightDate,
            adminFullName: localStorage.getItem('fullName'),
            flightTime: formData.flightTime,
            gate: formData.gate,
            timestamp,
        });

        if (res.data.error) {
            toastError(res.data.error);
        } else {
            toastSuccess("Новый рейс успешно создан!");
            closePopup("#FlightPopup");
            socket.emit('isFlightsUpdate', { status: true });
        }
    } catch (error) {
        console.error("Error creating flight:", error);
        toastError("Что-то пошло не так, рейс не был создан");
    }
}
