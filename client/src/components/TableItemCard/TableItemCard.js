// TableItemCard.js
export function createTableItemCard({ children, onEdit, onRemove }) {
    const card = $(`
        <div class="body__item">
            <div class="body__item__tools">
                <div class="tool__item remove">
                    <img src="src/assets/card/trash.svg" alt="Удалить">
                </div>
                <div class="tool__item edit">
                    <img src="src/assets/card/pencil.svg" alt="Редактировать">
                </div>
            </div>
            ${children}
        </div>
    `);

    card.find('.remove').on('click', onRemove);
    card.find('.edit').on('click', onEdit);

    return card;
}
