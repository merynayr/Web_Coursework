// AdminTableItemCard.js
import { createTableItemCard } from './TableItemCard.js';

export function createAdminTableItemCard(adminData) {
    const currentAdminFullName = localStorage.getItem('fullName');
    const isMyCard = currentAdminFullName === adminData.fullName
    const formatRole = adminData.role === 'mainAdmin' ? "Главный администратор" : "Модератор";
    const children = `
        ${isMyCard ? '<div class="table-item__badge green">Вы</div>' : ''}
        <div class="table-item">
            <div class="table-item__category">
                <div class="table-item__category__title">ФИО Администратора:</div>
                <div class="table-item__category__info">${adminData.fullName}</div>
            </div>
            <div class="table-item__category">
                <div class="table-item__category__title">Уровень:</div>
                <div class="table-item__category__info role ${adminData.role === 'mainAdmin' ? 'main' : 'sub'}">${formatRole}</div>
            </div>
        </div>
    `;

    const card = createTableItemCard({
        children,
        onEdit: () => {
            loadEditContent('admins', adminData); // Загружаем контент редактирования
            togglePopup("#editItemPopup"); // Открываем модальное окно редактирования
        },
        onRemove: () => {
            $('#removeItemPopup').data("Id", adminData.id); // Устанавливаем adminId
            $('#removeItemPopup').data("itemCategory", "admins"); // Устанавливаем категорию элемента
            togglePopup("#removeItemPopup"); // Открываем модальное окно удаления
        },
    });

    return card;
}
