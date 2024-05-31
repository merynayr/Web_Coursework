// EditAdminsContent.js
import axios from "axios";
import { endpoints } from "../../api";
import { socket } from "../../socket.js";
import { closePopup } from '../Popups/Popup.js';

// Функция для сохранения изменений
export function saveChanges(formData, id) {
    const fullName = formData.fullName;
    const role = formData.role;

    // Проверка заполнения полей
    if (!fullName || !role) {
        toastError("Кажется, вы что-то не указали");
        return;
    }
    const newAdminData = { id, ...formData }
    // Отправка данных на сервер
    axios.put(`${endpoints.SERVER_ORIGIN_URI}${endpoints.ADMINS.ROUTE}${endpoints.ADMINS.CHANGE}`, newAdminData )
        .then(res => {
            // Проверка ответа от сервера
            if (res.data.error) {
                toastError(res.data.error);
            } else {
                toastSuccess("Данные администратора успешно изменены!");
                closePopup("#editItemPopup"); 
                socket.emit('isAdminsUpdate', { status: true });
            }
        })
        .catch(error => {
            console.error("Error updating admin:", error);
            toastError("Произошла ошибка при обновлении данных администратора");
        });
}
