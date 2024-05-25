import TableItemCard from "./TableItemCard";

const AdminTableItemCard = ({ fullName, role, id }) => {
    // Компонент для отображения данных админа в виде карточки

    const adminData = { id, fullName, role };
    const currentAdminFullName = localStorage.getItem('fullName');

    const isMyCard = currentAdminFullName === adminData.fullName;

    const formatRole = role === 'mainAdmin' ? "Главный администратор" : "Администратор";

    const container = document.createElement('div');
    container.classList.add('table-item');

    if (isMyCard) {
        const badge = document.createElement('div');
        badge.classList.add('table-item__badge', 'green');
        badge.textContent = 'Вы';
        container.appendChild(badge);
    }

    const fullNameCategory = document.createElement('div');
    fullNameCategory.classList.add('table-item__category');

    const fullNameTitle = document.createElement('div');
    fullNameTitle.classList.add('table-item__category__title');
    fullNameTitle.textContent = 'ФИО Администратора:';

    const fullNameInfo = document.createElement('div');
    fullNameInfo.classList.add('table-item__category__info');
    fullNameInfo.textContent = fullName;

    fullNameCategory.appendChild(fullNameTitle);
    fullNameCategory.appendChild(fullNameInfo);
    container.appendChild(fullNameCategory);

    const roleCategory = document.createElement('div');
    roleCategory.classList.add('table-item__category');

    const roleTitle = document.createElement('div');
    roleTitle.classList.add('table-item__category__title');
    roleTitle.textContent = 'Уровень:';

    const roleInfo = document.createElement('div');
    roleInfo.classList.add('table-item__category__info', 'role');
    roleInfo.classList.add(role === 'mainAdmin' ? 'main' : 'sub');
    roleInfo.textContent = formatRole;

    roleCategory.appendChild(roleTitle);
    roleCategory.appendChild(roleInfo);
    container.appendChild(roleCategory);

    const tableItemCard = new TableItemCard({
        itemId: id,
        itemCategory: 'admins',
        data: adminData,
        children: container
    });

    return tableItemCard;
};

export default AdminTableItemCard;
