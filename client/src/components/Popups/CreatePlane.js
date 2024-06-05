import { togglePopup, setupPopup, closePopup } from './Popup.js';
import { isDataFilled } from '../../utils/isDataFilled.js';
import { endpoints } from '../../api/index.js';

$(document).ready(function () {
    setupPopup("#PlanePopup", "#popupCloseButtonCreate");

    $("#openPopupButton").click(function () {
        togglePopup("#PlanePopup");
    });

    $("#PlanePopup").submit(function (e) {
        e.preventDefault();

        const formData = {
            planeType: $("#planeType").val(),
            seatCount: $("#seatCount").val(),
            planeCompany: $("#planeCompany").val(),
        };

        if (isDataFilled(formData)) {
            toastError("Кажется, вы что-то не указали");
            return;
        }

        if (parseInt(formData.seatCount) > 168) {
            toastError("Количество мест превышает 168!");
            return;
        }

        createPlane(formData);
    });
});

async function createPlane(formData) {
    try {
        const res = await fetch(`${endpoints.SERVER_ORIGIN_URI}${endpoints.PLANES.ROUTE}${endpoints.FLIGHTS.CREATE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.error) {
            toastError("Не удалось создать новый самолет, попробуйте позже");
        } else {
            toastSuccess("Данные самолета успешно сохранены");
            closePopup("#PlanePopup");
            fetchPlanes();
        }
    } catch (error) {
        console.error("Error creating plane:", error);
        toastError("Не удалось создать новый самолет, попробуйте позже");
    }
}
