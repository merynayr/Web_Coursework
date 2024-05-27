import { togglePopup, setupPopup } from './Popup.js';
import { saveChanges as saveAdminChanges } from "../EditPopupContent/EditAdminsContent.js";
import { saveChanges as saveFlightChanges } from "../EditPopupContent/EditFlightsContent.js";
// import { saveChanges as saveAirportChanges } from "../EditPopupContent/EditAirportsContent.js";
// import { saveChanges as savePassengerChanges } from "../EditPopupContent/EditPassengersContent.js";
// import { saveChanges as savePlaneChanges } from "../EditPopupContent/EditPlanesContent.js";

$(document).ready(function () {
    setupPopup("#editItemPopup", "#popupCloseButtonEdit");

    let currentData = null;

    // Функция для загрузки контента редактирования
    function loadEditContent(category, data) {
        currentData = data; // Сохраняем текущие данные

        const categoryMap = {
            'admins': `EditAdminsContent.html`,
            'flights':  `EditFlightsContent.html`
            // 'airports': 'EditAirportsContent.html',
            // 'passengers': 'EditPassengersContent.html',
            // 'planes': 'EditPlanesContent.html'
        };

        const editContentUrl = `src/components/EditPopupContent/${categoryMap[category]}`;
        $("#editItemPopup .popup__container__body").load(editContentUrl, function () {
            switch (category) {
                case 'admins':
                    $("#fullName").val(data.fullName);
                    $("#role").val(data.role);
                    break;
                case 'flights':
                    $("#flightNumber").val(data.flightNumber);
                    $("#departureAirport").val(data.departureAirport);
                    $("#destinationAirport").val(data.destinationAirport);
                    $("#flightPlaneType").val(data.flightPlaneType);
                    $("#flightTime").val(data.flightTime);
                    $("#date").val(data.date);
                    $("#flightPrice").val(data.flightPrice);
                    $("#flightStatus").val(data.flightStatus);
                    break;
                case 'airports':
                    $("#airportName").val(data.airportName);
                    $("#airportCode").val(data.airportCode);
                    break;
                case 'passengers':
                    $("#passengerName").val(data.passengerName);
                    $("#passportNumber").val(data.passportNumber);
                    break;
                case 'planes':
                    $("#planeModel").val(data.planeModel);
                    $("#planeCapacity").val(data.planeCapacity);
                    break;
            }
        });
    }

    // Обработчик отправки формы редактирования
    $(document).on('submit', '#editItemForm', function (e) {
        e.preventDefault();
        const formData = {};
        $(this).serializeArray().forEach(field => {
            formData[field.name] = field.value;
        });

        if (currentData) {
            const saveChangesMap = {
                'admins': saveAdminChanges,
                'flights': saveFlightChanges,
                'airports': saveAirportChanges,
                'passengers': savePassengerChanges,
                'planes': savePlaneChanges
            };
            const saveChangesFunction = saveChangesMap[currentData.category];
            saveChangesFunction(formData, currentData.id);
        }
    });

    window.togglePopup = togglePopup;
    window.loadEditContent = loadEditContent;
});
