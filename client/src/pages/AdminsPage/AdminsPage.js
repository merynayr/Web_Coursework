import { createAdminTableItemCard } from '../../components/TableItemCard/AdminTableItemCard.js';
import { renderNoItems } from '../../components/NoItems/NoItems.js';
import { endpoints } from "../../api/index.js";


$(document).ready(function () {
    let admins = [];
    let unChangedAdmins = [];
    let isFetching = false;

    $("#createContainer").load("src/components/Popups/CreateAdmin.html");
    $("#editContainer").load("src/components/Popups/EditItem.html");
    $("#removeContainer").load("src/components/Popups/RemoveItem.html");

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
            renderNoItems('#admin-table-container', 'Админов не найдено 😔', true);
        }
    };

    // Обработчик поиска
    $('#searchInput').on('input', function (e) {
        const searchValue = e.target.value.toLowerCase();
        const filteredAdmins = unChangedAdmins.filter(admin => admin.fullName.toLowerCase().includes(searchValue));
        renderAdmins(filteredAdmins);

        if (searchValue === '') {
            fetchAdmins();
        }
    });

    // Функция для получения данных рейсов через HTTP-запрос
    const fetchAdmins = () => {
        if (isFetching) return;
        isFetching = true;
        $.ajax({
            url: `${endpoints.SERVER_ORIGIN_URI}${endpoints.ADMINS.ROUTE}${endpoints.ADMINS.GET_ALL}`,
            method: 'GET',
            success: (data) => {
                admins = data.body;
                unChangedAdmins = data.body;
                renderAdmins(admins);

                isFetching = false;
            },
            error: (err) => {
                console.error('Error fetching admins:', err);
                isFetching = false;
                renderAdmins([]);
            }
        });
    };

    fetchAdmins();
    window.fetchAdmins = fetchAdmins;
});

