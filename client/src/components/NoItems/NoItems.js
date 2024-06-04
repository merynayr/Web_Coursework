export function renderNoItems(containerSelector, title, showUpdateButton = true) {
    const container = $(containerSelector);
    container.empty();

    const noItemsHtml = `
        <div class="no-items">
            <div class="no-items__container">
                <div class="title">${title}</div>
                ${showUpdateButton ? '<button id="updateButton" class="update">Обновить</button>' : ''}
            </div>
        </div>
    `;

    container.html(noItemsHtml); 
}
