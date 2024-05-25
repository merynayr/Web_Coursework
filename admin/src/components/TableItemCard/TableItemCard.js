import EditItem from '../Popups/EditItem.js';
import RemoveItem from '../Popups/RemoveItem.js';
import './TableItemCard.css';

const TableItemCard = ({ itemId, itemCategory, data, children }) => {
    let isRemovePopupOpen = false;
    let isEditOpenPopup = false;

    const removePopupHandler = () => {
        isRemovePopupOpen = !isRemovePopupOpen;
        // Здесь будет код для открытия попапа удаления
        const popupContainer = document.getElementById('popup-container');
        if (isRemovePopupOpen) {
            const removePopup = new RemoveItem({
                title: 'Удаление элемента',
                popupHandlerFunc: () => {
                    isRemovePopupOpen = false;
                    popupContainer.innerHTML = ''; // Закрыть попап удаления
                },
                itemId,
                itemCategory,
            });
            popupContainer.appendChild(removePopup.render());
        } else {
            popupContainer.innerHTML = ''; // Закрыть попап удаления
        }
    };

    const editPopupHandler = () => {
        isEditOpenPopup = !isEditOpenPopup;
        // Здесь будет код для открытия попапа редактирования
        const popupContainer = document.getElementById('popup-container');
        if (isEditOpenPopup) {
            const editPopup = new EditItem({
                title: 'Редактирование',
                popupHandlerFunc: () => {
                    isEditOpenPopup = false;
                    popupContainer.innerHTML = ''; // Закрыть попап редактирования
                },
                itemCategory,
                data,
            });
            popupContainer.appendChild(editPopup.render());
        } else {
            popupContainer.innerHTML = ''; // Закрыть попап редактирования
        }
    };

    const container = document.createElement('div');
    container.classList.add('body__item');

    const toolsContainer = document.createElement('div');
    toolsContainer.classList.add('body__item__tools');

    const removeTool = document.createElement('div');
    removeTool.classList.add('tool__item', 'remove');
    removeTool.addEventListener('click', removePopupHandler);

    const removeImage = document.createElement('img');
    removeImage.src = 'trash.svg';
    removeImage.alt = 'Удалить';

    const editTool = document.createElement('div');
    editTool.classList.add('tool__item', 'edit');
    editTool.addEventListener('click', editPopupHandler);

    const editImage = document.createElement('img');
    editImage.src = 'pencil.svg';
    editImage.alt = 'Редактировать';

    const childElements = document.createElement('div');
    childElements.appendChild(children);

    removeTool.appendChild(removeImage);
    editTool.appendChild(editImage);
    toolsContainer.appendChild(removeTool);
    toolsContainer.appendChild(editTool);
    container.appendChild(toolsContainer);
    container.appendChild(childElements);

    return container;
};

export default TableItemCard;
