import { createPassengerTableItemCard } from '../../components/TableItemCard/PassengerTableItemCard.js';
import { renderNoItems } from '../../components/NoItems/NoItems.js';

$(document).ready(function () {
    let passengers = [];
    let unChangedPassengers = [];
    let isFetching = false;

    document.getElementById('createPassengerButton').addEventListener('click', function () {
        window.location.href = '/register-passenger';
    });
    $("#editContainer").load("src/components/Popups/EditItem.html");
    $("#removeContainer").load("src/components/Popups/RemoveItem.html");

    // Функция для рендеринга пассажиров
    const renderPassengers = (passengerData) => {
        const container = $('#passengersContainer');
        container.empty();

        if (passengerData.length) {
            passengerData.forEach(passenger => {
                const card = createPassengerTableItemCard(passenger);
                container.append(card);
            });
        } else {
            renderNoItems('#passengersContainer', 'Пассажиров не найдено 😔', 'passengersDataGet', true);
        }
    };

    // Обработчик поиска
    $('#searchInput').on('input', function (e) {
        const searchValue = e.target.value.toLowerCase();
        const filteredPassengers = unChangedPassengers.filter(passenger =>
            passenger.fullName.toLowerCase().includes(searchValue) ||
            passenger.flightNumber.toLowerCase().includes(searchValue) ||
            passenger.seatNumber.toLowerCase().includes(searchValue)
        );
        renderPassengers(filteredPassengers);

        if (searchValue === '') {
            fetchPassengersData();
        }
    });

    // Функция для получения данных пассажиров через AJAX
    const fetchPassengersData = () => {
        if (!isFetching) {
            isFetching = true;
            fetch('/api/passengers')
                .then(response => response.json())
                .then(data => {
                    if (data.body.length) {
                        passengers = data.body;
                        unChangedPassengers = data.body;
                        renderPassengers(passengers);
                    }
                    isFetching = false;
                })
                .catch(error => {
                    console.error('Error fetching passengers data:', error);
                    isFetching = false;
                });
        }
    };

    // Получаем данные пассажиров при загрузке страницы
    fetchPassengersData();
});
