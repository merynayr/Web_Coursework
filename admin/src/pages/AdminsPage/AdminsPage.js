import { createAdminTableItemCard } from '../../components/TableItemCard/AdminTableItemCard.js';
import { socket } from '../../socket.js';
import { renderNoItems } from '../../components/NoItems/NoItems.js';


$(document).ready(function() {
    let admins = [];
    let unChangedAdmins = [];
    let isFetching = false;

    $("#createAdminContainer").load("src/components/Popups/CreateAdmin.html");
    $("#editAdminContainer").load("src/components/Popups/EditItem.html");

    // Функция для рендеринга администраторов
    const renderAdmins = (adminData) => {
        const container = $('#admin-table-container');
        container.empty();

        if (adminData.length) {
            adminData.forEach(admin => {
                const card = createAdminTableItemCard(admin);
                container.append(card);
            });
        } else {
            // container.html('<div class="no-items"><div class="no-items__container"><div class="title" id="noItemsTitle"></div><button id="updateButton" class="update">Обновить</button></div></div>');
            renderNoItems('#admin-table-container', 'Админов не найдено 😔', 'adminsDataGet', true);
        }
    };

    // Обработчик поиска
    $('#searchInput').on('input', function(e) {
        const searchValue = e.target.value.toLowerCase();
        const filteredAdmins = unChangedAdmins.filter(admin => admin.fullName.toLowerCase().includes(searchValue));
        renderAdmins(filteredAdmins);

        if (searchValue === '') {
            socket.emit('adminsDataGet');
        }
    });

    // Получаем данные администраторов при загрузке страницы через socket
    socket.emit('adminsDataGet');

    // Обрабатываем ответ с данными администраторов
    socket.on('adminsResponse', (data) => {
        if (data.body.length) {
            admins = data.body;
            unChangedAdmins = data.body;
            renderAdmins(admins);
        }

        isFetching = false;
    });

    // Обновляем список администраторов в реальном времени
    socket.on('adminsUpdate', () => {
        socket.emit('adminsDataGet');
    });
});
