import { socket } from '../../socket';
import './NoItems.css'

export function renderNoItems(containerSelector, title, socketEmitEndpoint = "isFlightsUpdate", showUpdateButton = true) {
    const container = $(containerSelector);
    container.empty(); // Очистим контейнер перед вставкой сообщения

    const noItemsHtml = `
        <div class="no-items">
            <div class="no-items__container">
                <div class="title">${title}</div>
                ${showUpdateButton ? '<button id="updateButton" class="update">Обновить</button>' : ''}
            </div>
        </div>
    `;

    container.html(noItemsHtml); // Вставим сообщение в указанный контейнер

    // Назначаем обработчик события для кнопки обновления
    if (showUpdateButton) {
        $('#updateButton').on('click', function() {
            // Отправляем запрос с текущей строкой поиска
            socket.emit(socketEmitEndpoint, { search: searchValue });
        });
    }
}
