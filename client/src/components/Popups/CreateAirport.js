// CreateAirport.js
import { togglePopup, setupPopup, closePopup } from './Popup.js';
import { endpoints } from "../../api/index.js";
import { isDataFilled } from "../../utils/isDataFilled.js";

$(document).ready(function () {
    setupPopup("#airportPopup", "#popupCloseButtonCreate");
    $("#openPopupButton").click(function () {
        togglePopup("#airportPopup");
    });

    $("#airportPopup").submit(function (e) {
        e.preventDefault();

        const airportName = $("#airportName").val();
        const airportPlace = $("#airportPlace").val();

        createAirport({ airportName, airportPlace });
    });
});

async function createAirport(formData) {
    const isFormDataFilled = isDataFilled(formData);

    if (isFormDataFilled) {
        toastError("Кажется, вы что-то не указали");
        return;
    }

    try {
        const response = await fetch(`${endpoints.SERVER_ORIGIN_URI}${endpoints.AIRPORTS.ROUTE}${endpoints.AIRPORTS.CREATE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();

        if (data.error) {
            toastError(data.error);
        } else {
            toastSuccess("Новый аэропорт успешно добавлен!");
            closePopup("#airportPopup");
            fetchAirports();
        }
    } catch (error) {
        console.error("Error creating airport:", error);
        toastError("Произошла ошибка при создании аэропорта");
    }
}
