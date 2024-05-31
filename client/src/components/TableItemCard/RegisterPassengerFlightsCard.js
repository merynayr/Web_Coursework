import axios from 'axios';
import { endpoints } from '../../api/index.js';
import { flightStatus as flStatus } from '../../utils/flightsStatus.js';
import '../../pages/FlightsPage/FlightsPage.css';

export function createRegisterPassengerFlightsCard(props, onCardClick) {
    const {
        flightNumber,
        departureAirport,
        destinationAirport,
        flightPrice,
        flightStatus,
        flightTime,
        date,
        gate,
    } = props;

    const clickHandler = () => {
        let setFormData = {
            flightNumber,
            departureAirport, 
            destinationAirport, 
            flightPrice,
            flightTime,
            date,
            gate,
            flightStatus
        };

        if (flightNumber) {
            toastInfo(`Рейс успешно выбран`);
            const currentFlightNumber = flightNumber;
            axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.PLANES.ROUTE}${endpoints.PLANES.PLANE}/${currentFlightNumber}`)
            .then(res => {
                setFormData = { ...setFormData, planeSeatPlaces: [...res.data.body] };
                onCardClick(setFormData); // Передача данных через callback
            })
            .catch(err => {
                console.error(err);
                toastError("Что-то пошло не так, попробуйте позже");
            });
        } else {
            onCardClick(setFormData); // Передача данных через callback
        }
    };

    const currentStatus = flStatus[flightStatus];

    const card = $(`
    <div class="flight-card">
        <table>
            <tr>
                <td class='td__title'>Номер рейса</td>
                <td class='td__info'>${flightNumber}</td>
            </tr>
            <tr>
                <td class='td__title'>Аэропорт вылета</td>
                <td class='td__info'>${departureAirport}</td>
            </tr>
            <tr>
                <td class='td__title'>Аэропорт назначения</td>
                <td class='td__info'>${destinationAirport}</td>
            </tr>
            <tr>
                <td class='td__title'>Цена рейса (эконом)</td>
                <td class='td__info'>${flightPrice}₽</td>
            </tr>
            <tr>
                <td class='td__title'>Состояние рейса</td>
                <td class='td__info ${currentStatus[0]}'>${currentStatus[1]}</td>
            </tr>
        </table>
    </div>
    `);

    card.addClass('search__result__item').click(clickHandler);

    return card;
}
