import { endpoints } from '../../api/index.js';
import { closePopup } from '../Popups/Popup.js';

$(document).ready(function () {
    $("#editAirportForm").submit(function (e) {
        e.preventDefault();

        const editedAirportData = {
            airportName: $("#editAirportName").val(),
            airportPlace: $("#editAirportPlace").val()
        };

        saveChanges(editedAirportData, /* Здесь должен быть ID аэропорта */);
    });
});

export async function saveChanges(formData, airportId) {
    try {
        const res = await fetch(`${endpoints.SERVER_ORIGIN_URI}${endpoints.AIRPORTS.ROUTE}${endpoints.AIRPORTS.CHANGE}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...formData, id: airportId })
        });

        const data = await res.json();

        if (data.error) {
            toastError('Не удалось сохранить изменения');
        } else {
            toastSuccess("Изменения успешно сохранены!");
            closePopup("#editItemPopup");
            fetchAirports();
        }
    } catch (error) {
        console.error("Error saving changes:", error);
        toastError('Не удалось сохранить изменения');
    }
}
