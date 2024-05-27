import axios from 'axios';
import { endpoints } from "../../api";
import { socket } from "../../socket.js";
// import { toastError, toastSuccess } from "../../utils/toasts.js";
import { togglePopup } from '../Popups/Popup.js';

// Функция для загрузки данных аэропортов и самолетов
function loadData() {
    const airportsPromise = axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.AIRPORTS.ROUTE}${endpoints.AIRPORTS.GET_ALL}`);
    const planesPromise = axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.PLANES.ROUTE}${endpoints.PLANES.GET_FREE}`);

    return Promise.all([airportsPromise, planesPromise]);
}

// Функция для заполнения опций в select
function populateSelect(selectElement, items, keyName, valueName) {
    selectElement.innerHTML = '';
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item[valueName];
        option.textContent = `${item[keyName]} - ${item[valueName]}`;
        selectElement.appendChild(option);
    });
}

// Функция для сохранения изменений
export function saveChanges(formData, id) {
    const flightNumber = formData.flightNumber;
    const departureAirport = formData.departureAirport;
    const destinationAirport = formData.destinationAirport;
    const flightPlaneType = formData.flightPlaneType;
    const flightPrice = formData.flightPrice;

    // Проверка заполнения полей
    if (!departureAirport || !destinationAirport || !flightPlaneType || !flightPrice) {
        toastError("Кажется, вы что-то не указали");
        return;
    }

    const updatedFlightData = { id, ...formData };
    // Отправка данных на сервер
    axios.put(`${endpoints.SERVER_ORIGIN_URI}${endpoints.FLIGHTS.ROUTE}${endpoints.FLIGHTS.CHANGE}`, updatedFlightData)
        .then(res => {
            if (res.data.error) {
                toastError(res.data.error);
            } else {
                toastSuccess("Данные рейса успешно изменены!");
                togglePopup("#editItemPopup");
                socket.emit('isFlightsUpdate', { status: true });
            }
        })
        .catch(error => {
            console.error("Error updating flight:", error);
            toastError("Произошла ошибка при обновлении данных рейса");
        });
}

// // Инициализация формы редактирования
// $(document).ready(function () {
//     const departureAirportSelect = document.getElementById('departureAirport');
//     const destinationAirportSelect = document.getElementById('destinationAirport');
//     const flightPlaneTypeSelect = document.getElementById('flightPlaneType');
//     const form = document.getElementById('editItemForm');

//     let currentData = null;

//     window.loadEditContent = function (category, data) {
//         if (category !== 'flights') return;

//         currentData = data;

//         loadData().then(([airportsRes, planesRes]) => {
//             if (airportsRes.data.error || planesRes.data.error) {
//                 toastError("Не удалось загрузить данные для редактирования");
//                 return;
//             }

//             const airports = airportsRes.data.body.sort((a, b) => a.airportName.localeCompare(b.airportName));
//             const planes = planesRes.data.body;

//             populateSelect(departureAirportSelect, airports, 'airportName', 'airportId');
//             populateSelect(destinationAirportSelect, airports, 'airportName', 'airportId');
//             populateSelect(flightPlaneTypeSelect, planes, 'planeType', 'id');

//             document.getElementById('departureAirport').value = data.departureAirportId;
//             document.getElementById('destinationAirport').value = data.destinationAirportId;
//             document.getElementById('flightPlaneType').value = data.flightPlaneType;
//             document.getElementById('flightPrice').value = data.flightPrice;
//         }).catch(() => {
//             toastError("Не удалось загрузить данные для редактирования");
//         });
//     };

//     form.addEventListener('submit', function (e) {
//         e.preventDefault();

//         const formData = {
//             flightNumber: currentData.flightNumber,
//             departureAirportId: departureAirportSelect.value,
//             destinationAirportId: destinationAirportSelect.value,
//             flightPlaneType: flightPlaneTypeSelect.value,
//             flightPrice: document.getElementById('flightPrice').value
//         };

//         saveChanges(formData, currentData.id);
//     });
// });
