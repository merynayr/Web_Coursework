import { togglePopup, setupPopup, closePopup } from './Popup.js';
import axios from 'axios';
import { itemCategories } from '../../api/itemCategoriesApi.js'
import { socket } from "../../socket.js";
import getSocketPathByItemCategory from '../../utils/getSocketPathByItemCategory'



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
            console.log(itemCategory, itemCategories[itemCategory], itemId);
            const response = await axios.delete(`${itemCategories[itemCategory]}/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });

            if (response.data.error) {
                toastError(response.data.error);

                if (response.data.error.isRemoveAdminData !== undefined) {
                    localStorage.setItem('fullName', '');
                    localStorage.setItem('token', '');
                    localStorage.setItem('admin-type', '');
                }
            } else {
                toastSuccess("Успешное удаление!")
                socket.emit(socketPath, { status: true })
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
