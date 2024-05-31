// Загрузка боковой панели
function loadSidebar() {
    const sidebarElement = $('#sidebar');
    if (window.location.pathname !== '/auth') {
        sidebarElement.load('src/layout/Sidebar.html');
    } else {
        sidebarElement.empty(); // Очистить sidebar для страницы авторизации
        sidebarElement.hide(); // Скрыть sidebar для страницы авторизации
    }
}

$(document).ready(function () {
    loadSidebar();

    // Проверка авторизации при первом открытии
    const isAuthorized = !!localStorage.getItem('token') &&
        !!localStorage.getItem('fullName') &&
        !!localStorage.getItem('admin-type');

    if (isAuthorized) {
        if (window.location.pathname === '/' || window.location.pathname === '/auth') {
            router.navigate('/register-passenger');
        }
    } else {
        if (window.location.pathname !== '/auth') {
            router.navigate('/auth');
        }
    }

    router.init();

    // Обработчик событий для элементов .nav-link
    $('body').on('click', '.nav-link', function(event) {
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
    $('#content').load('src/pages/AirportsPage/AirportsPage.html');
});

router.route('/planes', function () {
    $('#content').load('src/pages/PlanesPage/PlanesPage.html');
});

router.route('/admins', function () {
    $('#content').load('src/pages/AdminsPage/AdminsPage.html');
});

router.route('/passengers', function () {
    $('#content').load('src/pages/PassengersPage/PassengersPage.html');
});

router.route('/', function () {
    loadSidebar();
    $('#app').load('src/pages/AuthPage/AuthPage.html');
});

router.route('/auth', function () {
    loadSidebar();
    $('#app').load('src/pages/AuthPage/AuthPage.html');
});
