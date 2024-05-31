import { isDataFilled } from "../../utils/isDataFilled.js";
import { socket } from "../../socket.js";
import axios from "axios";
import { endpoints } from "../../api/index.js";

$(document).ready(function() {
    let formData = {};
    let airports = [];
    let planes = [];

    // Функция для заполнения списка аэропортов
    const fillAirportsSelect = () => {
        const select = $('#departureAirport, #destinationAirport');
        select.empty();
        select.append('<option value="">Выберите аэропорт</option>');
        airports.forEach(airport => {
            select.append(`<option value="${airport.airportId}">${airport.airportName} - ${airport.airportPlace}</option>`);
        });
    };

    // Функция для заполнения списка самолетов
    const fillPlanesSelect = () => {
        const select = $('#flightPlaneType');
        select.empty();
        select.append('<option value="">Выберите самолет</option>');
        planes.forEach(plane => {
            select.append(`<option value="${plane.id}">${plane.planeType}</option>`);
        });
    };

    // Получение списка аэропортов и самолетов при загрузке страницы
    const getAirportsAndPlanes = () => {
        // Получение списка аэропортов
        $.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.AIRPORTS.ROUTE}${endpoints.AIRPORTS.GET_ALL}`)
        .done(response => {
            if (response.error) {
                toastError("Не удалось загрузить список аэропортов");
                return;
            }
            airports = response.body.sort((a, b) => a.airportName.localeCompare(b.airportName));
            fillAirportsSelect();
        })
        .fail(() => {
            toastError("Не удалось загрузить список аэропортов");
        });

        // Получение списка самолетов
        $.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.PLANES.ROUTE}${endpoints.PLANES.GET_FREE}`)
        .done(response => {
            if (response.error) {
                toastError("Что-то пошло не так, попробуйте позже");
                return;
            }
            planes = response.body;
            fillPlanesSelect();
        })
        .fail(() => {
            toastError("Не удалось загрузить список доступных самолетов");
        });
    };

    // Выбор аэропорта вылета или прилета
    $('.airport-select').on('change', function() {
        const airportId = $(this).val();
        const airportName = $(this).find('option:selected').text();
        const field = $(this).attr('id');
        formData[field + 'Id'] = airportId;
        formData[field] = airportName;
    });

    // Выбор самолета
    $('#flightPlaneType').on('change', function() {
        const planeId = $(this).val();
        const planeType = $(this).find('option:selected').text();
        formData.flightPlane = planeId;
        formData.flightPlaneType = planeType;
    });

    // Получение списка аэропортов и самолетов при загрузке страницы
    getAirportsAndPlanes();

    // Привязка обработчика сохранения изменений к форме
});

// Сохранение изменений
export function saveChanges(formData, id) {
    const isFormDataFilled = isDataFilled(formData);

    if (!isFormDataFilled) {
        toastError("Кажется, вы что-то не указали");
        return;
    }
    formData._id = id;

    axios.put(`${endpoints.SERVER_ORIGIN_URI}${endpoints.FLIGHTS.ROUTE}${endpoints.FLIGHTS.CHANGE}`, formData)
    .then(res => {
        if (res.data.error) {
            toastError("Что-то пошло не так, попробуйте позже");
            return;
        }
        toastSuccess("Данные рейса успешно изменены");
        socket.emit("isFlightsUpdate", { status: true });
    })
    .catch(() => {
        toastError("Что-то пошло не так, попробуйте позже");
    });
}


// {
//     _id: '665460ac452cfb05e2382249',
//     flightId: 1716805804841,
//     flightNumber: 'OGE4216',
//     departureAirportId: '1716122238523',
//     departureAirport: '3 общага - Казань',
//     destinationAirportId: '1716122254768',
//     destinationAirport: 'Дом - Москва',
//     flightPrice: '3000',
//     flightStatus: 'load',
//     flightPlane: 1716805754160,
//     gate: '1C',
//     flightTime: '15:55',
//     flightPlaneType: 'Ан-28',
//     date: '2024.05.31',
//     createdAt: '2024-05-27T10:30:04.850Z',
//     updatedAt: '2024-05-28T18:44:18.760Z',
//     __v: 0,
//     lastFlightPlaneType: 'второй',
//     lastFlightPlane: 1716909580546
//   }
  
// {
//     _id: '665460ac452cfb05e2382249',
//     flightId: 1716805804841,
//     flightNumber: 'OGE4216',
//     departureAirportId: '1716122238523',
//     departureAirport: '3 общага - Казань',
//     destinationAirportId: '1716122254768',
//     destinationAirport: 'Дом - Москва',
//     flightPrice: 2000,
//     flightStatus: 'load',
//     flightPlane: 1716909580546,
//     gate: '1C',
//     flightTime: '15:55',
//     flightPlaneType: 'второй',
//     date: '2024.05.31',
//     createdAt: '2024-05-27T10:30:04.850Z',
//     updatedAt: '2024-05-28T18:21:12.525Z',
//     __v: 0,
//     lastFlightPlaneType: 'второй',
//     lastFlightPlane: 1716909580546
//   }

//   {
//     _id: '665460ac452cfb05e2382249',
//     flightId: 1716805804841,
//     flightNumber: 'OGE4216',
//     departureAirportId: '1716122238523',
//     departureAirport: '3 общага - Казань',
//     destinationAirportId: '1716122254768',
//     destinationAirport: 'Дом - Москва',
//     flightPrice: 2000,
//     flightStatus: 'load',
//     flightPlane: 1716909580546,
//     gate: '1C',
//     flightTime: '15:55',
//     flightPlaneType: 'второй',
//     date: '2024.05.31',
//     createdAt: '2024-05-27T10:30:04.850Z',
//     updatedAt: '2024-05-28T18:15:56.825Z',
//     __v: 0,
//     lastFlightPlaneType: 'первый',
//     lastFlightPlane: 1716909570047
//   }