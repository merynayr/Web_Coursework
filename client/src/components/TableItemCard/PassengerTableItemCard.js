import { createTableItemCard } from './TableItemCard.js';

export function createPassengerTableItemCard(passengerData) {
    const { id, seatNumber, fullName, flightNumber } = passengerData;
    
    const children = `
        <div class="table-item">
            <div class="table-item__category">
                <div class="table-item__category__title">ФИО пассажира</div>
                <div class="table-item__category__info">${fullName}</div>
            </div>
            <div class="table-item__category">
                <div class="table-item__category__title">Номер рейса</div>
                <div class="table-item__category__info">${flightNumber}</div>
            </div>
            <div class="table-item__category">
                <div class="table-item__category__title">Номер места</div>
                <div class="table-item__category__info">${seatNumber}</div>
            </div>
        </div>
    `;

    const card = createTableItemCard({
        children,
        onRemove: () => {
            $('#removeItemPopup').data("Id", id); // Устанавливаем Id пассажира
            $('#removeItemPopup').data("itemCategory", "passengers"); // Устанавливаем категорию элемента
            togglePopup("#removeItemPopup"); // Открываем модальное окно удаления
        },
    });

    return card;
}
