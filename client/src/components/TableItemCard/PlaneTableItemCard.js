import { createTableItemCard } from './TableItemCard.js';

export function createPlaneTableItemCard(planeData) {
    const currentStatus = planeData.status === 'free' ? 'Свободен' : 'Занят (в рейсе)';

    const children = `
        <div class="table-item">
            <table>
                <tr>
                    <td>Тип</td>
                    <td>${planeData.planeType}</td>
                </tr>
                <tr>
                    <td>Компания</td>
                    <td>${planeData.planeCompany}</td>
                </tr>
                <tr>
                    <td>Вмещаемость</td>
                    <td>${planeData.seatCount} мест</td>
                </tr>
                <tr class="${planeData.status === 'free' ? 'plane-free' : ''}">
                    <td>Занято</td>
                    <td>${planeData.busySeatCount != undefined ? planeData.busySeatCount : ''} мест</td>
                </tr>
                <tr class="${planeData.status === 'free' ? 'plane-free' : ''}">
                    <td>Свободно</td>
                    <td>${planeData.freeSeatCount != undefined && planeData.status === 'busy' ? planeData.freeSeatCount : ''} мест</td>
                </tr>
                <tr>
                    <td>Статус</td>
                    <td class="status-type ${planeData.status === 'free' ? 'free' : 'busy'}" title="Текущий статус самолета">
                        <span>${currentStatus}</span>
                    </td>
                </tr>
            </table>
        </div>
    `;

    const card = createTableItemCard({
        children,
        onEdit: () => {
            loadEditContent('planes', planeData); // Загружаем контент редактирования
            togglePopup("#editItemPopup"); // Открываем модальное окно редактирования
        },
        onRemove: () => {
            $('#removeItemPopup').data("Id", planeData.id); // Устанавливаем planeId
            $('#removeItemPopup').data("itemCategory", "planes"); // Устанавливаем категорию элемента
            togglePopup("#removeItemPopup"); // Открываем модальное окно удаления
        },
    });

    return card;
}
