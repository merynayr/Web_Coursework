function togglePopup() {
    $(".popup").toggleClass("active");
}

$(document).ready(function() {
    $("#popupCloseButton").click(function() {
        togglePopup();
    });

    $(document).keyup(function(e) {
        if (e.key === "Escape" && $(".popup").hasClass("active")) {
            togglePopup();
        }
    });

    $(".popup").click(function(e) {
        e.stopPropagation();
        togglePopup();
    });

     $(".popup__container").click(function(e) {
        e.stopPropagation();
    });

    $("#adminForm").submit(function(e) {
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
    });
});

import { isDataFilled } from "../../utils/isDataFilled.js";
import axios from "axios";
import { socket } from "../../socket.js"; // Import socket here or define it if it's a global variable


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
            togglePopup();
            socket.emit('isAdminsUpdate', { status: true });
        }
    } catch (error) {
        console.error("Error creating admin:", error);
        toastError("Произошла ошибка при создании администратора");
    }
}
