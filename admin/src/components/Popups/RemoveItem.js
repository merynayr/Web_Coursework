import { toastSuccess, toastError } from '../../utils/toasts';
import { socket } from '../../socket.js';
import axios from 'axios';
import closeButton from "../../assets/popup/close.svg";

const RemoveItem = ({ title, popupHandlerFunc, itemId, itemCategory }) => {
    const closePopupHandler = () => {
        popupHandlerFunc(prev => !prev);
    };

    const socketPath = itemCategory; // Предположим, что itemCategory - это уже путь сокета, не требующий дополнительной обработки
    const jwtToken = localStorage.getItem('token');

    const removeItem = async () => {
        try {
            const res = await axios.delete(`${itemCategory}/${itemId}`, {
                headers: {
                    token: `Bearer ${jwtToken}`
                }
            });

            if (res.data.error) {
                toastError(res.data.error);

                if (res.data.error.isRemoveAdminData !== undefined) {
                    localStorage.setItem('fullName', '');
                    localStorage.setItem('token', '');
                    localStorage.setItem('admin-type', '');
                }

                closePopupHandler();
                return;
            }

            toastSuccess("Успешное удаление!");
            socket.emit(socketPath, { status: true });
            closePopupHandler();
        } catch (err) {
            toastError("Что-то пошло не так, попробуйте позже");
            console.error(err);
            closePopupHandler();
        }
    };

    const popupHandler = () => {
        popupHandlerFunc(prev => !prev);
    };

    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup');

    const popupContent = document.createElement('div');
    popupContent.classList.add('popup__container');

    popupContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    const popupHead = document.createElement('div');
    popupHead.classList.add('popup__container__head');

    const headTitle = document.createElement('div');
    headTitle.classList.add('head__title');
    headTitle.textContent = title;

    const headClose = document.createElement('div');
    headClose.classList.add('head__close');
    headClose.addEventListener('click', popupHandler);

    const closeImage = document.createElement('img');
    closeImage.src = closeButton;
    closeImage.alt = 'close';

    headClose.appendChild(closeImage);

    popupHead.appendChild(headTitle);
    popupHead.appendChild(headClose);

    const popupBody = document.createElement('div');
    popupBody.classList.add('popup__container__body');

    const removeItemContent = document.createElement('div');
    removeItemContent.classList.add('remove-item');

    const removeItemInfo = document.createElement('div');
    removeItemInfo.classList.add('remove-item__info');
    removeItemInfo.textContent = "Вы действительно хотите это удалить?";

    const removeItemButtons = document.createElement('div');
    removeItemButtons.classList.add('remove-item__buttons');

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('button', 'cancel');
    cancelButton.textContent = 'Отмена';
    cancelButton.addEventListener('click', closePopupHandler);

    const removeButton = document.createElement('button');
    removeButton.classList.add('button', 'remove');
    removeButton.textContent = 'Удалить';
    removeButton.addEventListener('click', removeItem);

    removeItemButtons.appendChild(cancelButton);
    removeItemButtons.appendChild(removeButton);

    removeItemContent.appendChild(removeItemInfo);
    removeItemContent.appendChild(removeItemButtons);

    popupBody.appendChild(removeItemContent);

    popupContent.appendChild(popupHead);
    popupContent.appendChild(popupBody);

    popupContainer.appendChild(popupContent);

    popupContainer.addEventListener('click', popupHandler);

    return popupContainer;
};

export default RemoveItem;
