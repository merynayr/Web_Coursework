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
            'admins': {
                template: `EditAdminsContent.html`,
                idProperty: 'id',
                saveFunction: saveAdminChanges,
                prepareFormData: function (formData, data) {
                    formData.id = data.id;
                }
            },
            'flights': {
                template: `EditFlightsContent.html`,
                idProperty: '_id',
                saveFunction: saveFlightChanges,
                prepareFormData: function (formData, data) {
                    formData.flightId = data.flightId;
                    formData.lastFlightPlaneType = data.lastFlightPlaneType;
                    formData.lastFlightPlane = data.lastFlightPlane;
                    formData._id = data._id;
                }
            }
            // Добавьте конфигурации для других категорий
        };

        const categoryConfig = categoryMap[category];
        const editContentUrl = `src/components/EditPopupContent/${categoryConfig.template}`;
        $("#editItemPopup .popup__container__body").load(editContentUrl, function () {
            switch (category) {
                case 'admins':
                    $("#fullName").val(data.fullName);
                    const role = data.role === 'mainAdmin' ? 'Главный администратор' : 'Администратор';
                    $("#AdminRole").val(role);
                    break;
                case 'flights':
                    $("#flightNumber").val(data.flightNumber);
                    $("#departureAirport").val(data.departureAirportId);
                    $("#destinationAirport").val(data.destinationAirportId);
                    $("#flightPlaneType").val(data.flightPlaneType);
                    $("#flightTime").val(data.flightTime);
                    $("#date").val(data.date);
                    $("#flightPrice").val(data.flightPrice);
                    $("#flightStatus").val(data.flightStatus);
                    $("#gate").val(data.gate);
                    break;
                // Добавьте обработку для других категорий
            }
        });

        // Обработчик отправки формы редактирования
        $(document).on('submit', '#editItemForm', function (e) {
            e.preventDefault();
            const formData = {};
            $(this).serializeArray().forEach(field => {
                formData[field.name] = field.value;
            });

            if (currentData) {
                const saveChangesFunction = categoryConfig.saveFunction;
                categoryConfig.prepareFormData(formData, currentData);
                saveChangesFunction(formData, currentData[categoryConfig.idProperty]);
            }
        });
    }

    window.togglePopup = togglePopup;
    window.loadEditContent = loadEditContent;
});
