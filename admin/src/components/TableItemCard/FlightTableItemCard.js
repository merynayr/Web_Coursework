import { createTableItemCard } from './TableItemCard.js';
import { flightStatus } from '../../utils/flightsStatus.js';

export function createFlightTableItemCard(flightData) {
    const status = flightStatus[flightData.flightStatus];
    
    const children = `
        <div class="table-item">
            <table>
                <tr>
                    <td>Номер рейса</td>
                    <td>${flightData.flightNumber}</td>
                </tr>
                <tr>
                    <td>Аэрапорт вылета</td>
                    <td>${flightData.departureAirport}</td>
                </tr>
                <tr>
                    <td>Аэрапорт назначения</td>
                    <td>${flightData.destinationAirport}</td>
                </tr>
                <tr>
                    <td>Самолет рейса</td>
                    <td>${flightData.flightPlaneType}</td>
                </tr>
                <tr>
                    <td>Время посадки</td>
                    <td>${flightData.flightTime} | ${flightData.date}</td>
                </tr>
                <tr>
                    <td>Цена рейса (эконом)</td>
                    <td>${flightData.flightPrice}₽</td>
                </tr>
                <tr class="current-status">
                    <td>Состояние рейса</td>
                    <td class="flight-status ${status[0]}" title="Текущий статус рейса">${status[1]}</td>
                </tr>
            </table>
        </div>
    `;

    const card = createTableItemCard({
        children,
        onEdit: () => {
            loadEditContent('flights', flightData); // Загружаем контент редактирования
            togglePopup("#editItemPopup"); // Открываем модальное окно редактирования
        },
        onRemove: () => {
            $('#removeItemPopup').data("Id", flightData.id); // Устанавливаем flightId
            $('#removeItemPopup').data("itemCategory", "flights"); // Устанавливаем категорию элемента
            togglePopup("#removeItemPopup"); // Открываем модальное окно удаления
        },
    });

    return card;
}
