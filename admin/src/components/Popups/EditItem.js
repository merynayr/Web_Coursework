import { socket } from '../../socket.js';
import { isDataFilled } from "../../utils/isDataFilled.js";
import axios from "axios";
import { togglePopup, setupPopup } from './Popup.js';
import { saveChanges } from "../EditPopupContent/EditAdminsContent.js";


$(document).ready(function () {
    // setupPopup("#editItemPopup", "#popupCloseButton");
    setupPopup("#editItemPopup", "#popupCloseButton");
    $("#edit").click(function () {
        togglePopup("#editItemPopup"); // Открываем модальное окно редактирования
    });

    // Функция для загрузки контента редактирования
    function loadEditContent(category, data) {
        const editContentUrl = `src/components/Popups/EditAdminsContent.html`;
        $("#editItemPopup .popup__container__body").load(editContentUrl, function () {
            $("#fullName").val(data.fullName);
            $("#role").val(data.role);
        });



        // Обработчик отправки формы редактирования
        $(document).on('submit', '#editItemForm', function (e) {
            e.preventDefault();
            const formData = {};
            $(this).serializeArray().forEach(field => {
                formData[field.name] = field.value;
            });

            saveChanges(formData, data.id);
        });
    }

    // Экспортируем функции, чтобы они были доступны глобально
    window.togglePopup = togglePopup;
    window.loadEditContent = loadEditContent;
});
