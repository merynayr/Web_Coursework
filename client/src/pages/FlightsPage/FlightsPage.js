import { createFlightTableItemCard } from '../../components/TableItemCard/FlightTableItemCard.js';
import { socket } from '../../socket.js';
import { renderNoItems } from '../../components/NoItems/NoItems.js';

$(document).ready(function () {
    let flights = [];
    let unChangedFlights = [];
    let isFetching = false;

    const allLinks = document.querySelectorAll('.create-new-button');
    allLinks.forEach(link => link.style.display = 'block');

    if (role !== 'subAdmin') {
        document.querySelectorAll('.public').forEach(link => link.style.visibility = 'hidden');
    }

    $("#createContainer").load("src/components/Popups/CreateFlight.html");
    $("#editContainer").load("src/components/Popups/EditItem.html");
    $("#removeContainer").load("src/components/Popups/RemoveItem.html");

    // Функция для рендеринга рейсов
    const renderFlights = (flightData) => {
        const container = $('#flightsContainer');
        container.empty();

        if (flightData.length) {
            flightData.forEach(flight => {
                const card = createFlightTableItemCard(flight);
                container.append(card);
            });
        } else {
            renderNoItems('#flightsContainer', 'Рейсов не найдено 😔', 'flightsDataGet', true);
        }
    };

    // Обработчик поиска
    $('#searchInput').on('input', function (e) {
        const searchValue = e.target.value.toLowerCase();
        const filteredFlights = unChangedFlights.filter(flight =>
            flight.flightNumber.toLowerCase().includes(searchValue) ||
            flight.departureAirport.toLowerCase().includes(searchValue) ||
            flight.destinationAirport.toLowerCase().includes(searchValue) ||
            flight.flightPlaneType.toLowerCase().includes(searchValue) ||
            flight.flightPrice.toString().includes(searchValue) ||
            flight.flightTime.toString().includes(searchValue) ||
            flight.date.toString().includes(searchValue)
        );
        renderFlights(filteredFlights);

        if (searchValue === '') {
            socket.emit('flightsDataGet');
        }
    });

    // Получаем данные рейсов при загрузке страницы через socket
    socket.emit('flightsDataGet');

    // Обрабатываем ответ с данными рейсов
    socket.on('flightsResponse', (data) => {
        if (data.body.length) {
            flights = data.body;
            unChangedFlights = data.body;
            renderFlights(flights);
        }
        isFetching = false;
    });

    // Обновляем список рейсов в реальном времени
    socket.on('flightsUpdate', () => {
        socket.emit('flightsDataGet');
    });
});
