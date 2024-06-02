// Загрузка боковой панели
function loadSidebar() {
    const sidebarElement = $('#sidebar');
    if (window.location.pathname !== '/auth') {
        sidebarElement.load('src/layout/Sidebar.html', function () {
            const adminInfo = document.getElementById('admin-info');
            const role = localStorage.getItem('admin-type');
            const fullname = localStorage.getItem('fullName');
            let roleDisplay;

            switch (role) {
                case 'mainAdmin':
                    roleDisplay = 'Главный администратор';
                    break;
                case 'subAdmin':
                    roleDisplay = 'Модератор';
                    break;
                default:
                    roleDisplay = 'Гость';
                    break;
            }

            adminInfo.innerHTML = `
                <div class="role">${roleDisplay}</div>
                <div class="fullname">${fullname !== null ? fullname : ''}</div>
            `;

            // Управление видимостью элементов боковой панели на основе роли пользователя
            const allLinks = document.querySelectorAll('.sidebar__link-wrapper');
            allLinks.forEach(link => link.style.display = 'none');

            if (role === 'mainAdmin') {
                document.querySelectorAll('.mainAdmin-only').forEach(link => link.style.display = 'block');
            } else if (role === 'subAdmin') {
                document.querySelectorAll('.subAdmin-only').forEach(link => link.style.display = 'block');
            } else {
                document.querySelectorAll('.public-only').forEach(link => link.style.display = 'block');
            }
        });
    } else {
        sidebarElement.empty(); // Очистить sidebar для страницы авторизации
        sidebarElement.hide(); // Скрыть sidebar для страницы авторизации
    }
}

$(document).ready(function () {
    loadSidebar();

    const publicPaths = ['/register-passenger', '/flights', '/auth'];

    // Проверка авторизации при первом открытии
    const isAuthorized = !!localStorage.getItem('token') &&
        !!localStorage.getItem('fullName') &&
        !!localStorage.getItem('admin-type');

    const currentPath = window.location.pathname;
    const role = localStorage.getItem('admin-type');

    if (isAuthorized) {
        if (role === 'mainAdmin' && currentPath !== '/admins') {
            router.navigate('/admins');
        } else if (role === 'subAdmin' && !['/register-passenger', '/passengers', '/flights', '/planes', '/airports'].includes(currentPath)) {
            router.navigate('/passengers');
        }
    } else {
        if (!publicPaths.includes(currentPath)) {
            router.navigate('/flights');
        }
    }

    router.init();

    // Обработчик событий для элементов .nav-link
    $('body').on('click', '.nav-link', function (event) {
        event.preventDefault();
        const path = $(this).attr('href');
        router.navigate(path);
    });
});

// Определение маршрутов и их обработчиков
router.route('/register-passenger', function () {
    $('#content').load('src/pages/RegisterPassengerPage/RegisterPassengerPage.html');
});

router.route('/flights', function () {
    $('#content').load('src/pages/FlightsPage/FlightsPage.html');
});

router.route('/airports', function () {
    const role = localStorage.getItem('admin-type');
    if (role === 'subAdmin') {
        $('#content').load('src/pages/AirportsPage/AirportsPage.html');
    } else {
        router.navigate('/auth');
    }
});

router.route('/planes', function () {
    const role = localStorage.getItem('admin-type');
    if (role === 'subAdmin') {
        $('#content').load('src/pages/PlanesPage/PlanesPage.html');
    } else {
        router.navigate('/auth');
    }
});

router.route('/admins', function () {
    const role = localStorage.getItem('admin-type');
    if (role === 'mainAdmin') {
        $('#content').load('src/pages/AdminsPage/AdminsPage.html');
    } else {
        router.navigate('/auth');
    }
});

router.route('/passengers', function () {
    const role = localStorage.getItem('admin-type');
    if (role === 'subAdmin') {
        $('#content').load('src/pages/PassengersPage/PassengersPage.html');
    } else {
        router.navigate('/auth');
    }
});

router.route('/', function () {
    loadSidebar();
    $('#app').load('src/pages/AuthPage/AuthPage.html');
});

router.route('/auth', function () {
    loadSidebar();
    $('#app').load('src/pages/AuthPage/AuthPage.html');
});
