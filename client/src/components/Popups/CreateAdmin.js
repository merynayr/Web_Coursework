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
        const role = $("#role").val();
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
        const res = await axios.post(`${endpoints.SERVER_ORIGIN_URI}${endpoints.ADMINS.ROUTE}${endpoints.ADMINS.CREATE}`, {
            ...formData,
            role: formData.role === 'Главный администратор' ? 'mainAdmin' : 'subAdmin'
        }, {
            headers: {
                token: `Bearer ${jwtToken}`
            }
        });

        if (res.data.error) {
            toastError(res.data.error);
        } else {
            toastSuccess("Новый администратор успешно создан!");
            closePopup("adminPopup");
            route.navigate('/admins');
            socket.emit('isAdminsUpdate', { status: true });
        }
    } catch (error) {
        console.error("Error creating admin:", error);
        toastError("Произошла ошибка при создании администратора");
    }
}
