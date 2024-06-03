import { togglePopup, setupPopup, closePopup } from './Popup.js';
import { itemCategories } from '../../api/itemCategoriesApi.js';
// import { socket } from "../../socket.js";
// import { endpoints } from './api'
import { getSocketPathByItemCategory } from '../../utils/getSocketPathByItemCategory.js';

$(document).ready(function () {
    setupPopup("#removeItemPopup", "#popupCloseButtonRemove");
    $("#cancelButton").click(function () {
        closePopup("#removeItemPopup");
    });

    $("#popupCloseButtonRemove").click(function () {
        closePopup("#removeItemPopup");
    });

    $("#removeButton").click(async function () {
        const itemId = $("#removeItemPopup").data("Id");
        const itemCategory = $("#removeItemPopup").data("itemCategory"); // Получаем категорию элемента
        removeItem(itemId, itemCategory); // Вызываем функцию удаления с передачей категории элемента
    });
    window.togglePopup = togglePopup;

    const removeItem = async (itemId, itemCategory) => {
        const socketPath = getSocketPathByItemCategory(itemCategory)
        const jwtToken = localStorage.getItem('token');

        try {
            const response = await fetch(`${itemCategories[itemCategory]}/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            const data = await response.json();

            if (data.error) {
                toastError(data.error);

                if (data.error.isRemoveAdminData !== undefined) {
                    localStorage.setItem('fullName', '');
                    localStorage.setItem('token', '');
                    localStorage.setItem('admin-type', '');
                }
            } else {
                toastSuccess("Успешное удаление!")
                // socket.emit(socketPath, { status: true })
                togglePopup("#removeItemPopup");
            }
        } catch (error) {
            toastError("Что-то пошло не так, попробуйте позже");
            console.error(error);
        } finally {
            closePopup("#removeItemPopup");
        }
    };
});
