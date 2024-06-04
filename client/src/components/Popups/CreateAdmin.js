// AdminsPage.js
import { togglePopup, setupPopup, closePopup } from './Popup.js';

$(document).ready(function () {
    setupPopup("#adminPopup", "#popupCloseButtonCreate");
    $("#openPopupButton").click(function () {
        togglePopup("#adminPopup");
    });

    $("#adminPopup").submit(function (e) {
        e.preventDefault();

        const fullName = $("#fullName").val();
        const role = $("#AdminRole").val();
        const password = $("#password").val();
        const secretWord = $("#secretWord").val();

        const jwtToken = localStorage.getItem('token');

        const formData = {
            fullName,
            role,
            password,
            secretWord
        };

        createAdmin(formData, jwtToken);
        closePopup("#adminPopup");
    });
});

import { isDataFilled } from "../../utils/isDataFilled.js";
import axios from "axios";
import { socket } from "../../socket.js";


async function createAdmin(formData, jwtToken) {
    const isFormDataFilled = isDataFilled(formData);
    if (isFormDataFilled) {
        toastError("Кажется, вы что-то не указали");
        return;
    }

    try {
        const response = await fetch(`${endpoints.SERVER_ORIGIN_URI}${endpoints.ADMINS.ROUTE}${endpoints.ADMINS.CREATE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${jwtToken}`
            },
            body: JSON.stringify({
                ...formData,
                role: formData.role === 'Главный администратор' ? 'mainAdmin' : 'subAdmin'
            })
        });
        const data = await response.json();

        if (data.error) {
            toastError(data.error);
        } else {
            toastSuccess("Новый администратор успешно создан!");
            closePopup("#adminPopup");
        }
    } catch (error) {
        console.error("Error creating admin:", error);
        toastError("Произошла ошибка при создании администратора");
    }
}