import { createTableItemCard } from './TableItemCard.js';

export function createAirportTableItemCard(airportData) {
    const { airportId, airportName, airportPlace } = airportData;

    const children = `
    <div class="table-item">
        <div class='table-item__category'>
            <div class='table-item__category__title'>Название аэропорта:</div>
            <div class='table-item__category__info'>${airportName}</div>
        </div>
        <div class='table-item__category'>
            <div class='table-item__category__title'>Местонахождение:</div>
            <div class='table-item__category__info'>${airportPlace}</div>
        </div>
    </div>
`;

    const card = createTableItemCard({
        children,
        onEdit: () => {
            loadEditContent('airports', airportData); // Загружаем контент редактирования
            togglePopup("#editItemPopup"); // Открываем модальное окно редактирования
        },
        onRemove: () => {
            $('#removeItemPopup').data("Id", airportData.airportId); // Устанавливаем airportId
            $('#removeItemPopup').data("itemCategory", "airports"); // Устанавливаем категорию элемента
            togglePopup("#removeItemPopup"); // Открываем модальное окно удаления
        },
    });

    return card;
}
