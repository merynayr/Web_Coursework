// EditAdminsContent.js
import { endpoints } from "../../api/index.js";
import { closePopup } from '../Popups/Popup.js';

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
    fetch(`${endpoints.SERVER_ORIGIN_URI}${endpoints.ADMINS.ROUTE}${endpoints.ADMINS.CHANGE}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAdminData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Проверка ответа от сервера
            if (data.error) {
                toastError(data.error);
            } else {
                toastSuccess("Данные администратора успешно изменены!");
                closePopup("#editItemPopup");
                fetchAdmins();
            }
        })
        .catch(error => {
            console.error("Error updating admin:", error);
            toastError("Произошла ошибка при обновлении данных администратора");
        });
}