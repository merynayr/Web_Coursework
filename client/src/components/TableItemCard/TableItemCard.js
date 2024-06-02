import '../../components/TableItemCard/TableItemCard.css';

// TableItemCard.js
export function createTableItemCard({ children, onEdit, onRemove }) {
    const isAuthorized = !!localStorage.getItem('token') &&
        !!localStorage.getItem('fullName') &&
        !!localStorage.getItem('admin-type');

    const currentPath = window.location.pathname;
    const isPassengersPage = currentPath === '/passengers';

    const card = $(`
        <div class="body__item">
            ${isAuthorized ? `
                <div class="body__item__tools">
                    <div class="tool__item remove">
                        <img src="src/assets/card/trash.svg" alt="Удалить">
                    </div>
                    ${!isPassengersPage ? `
                    <div class="tool__item edit">
                        <img src="src/assets/card/pencil.svg" alt="Редактировать">
                    </div>
                    ` : ''}
                </div>
            ` : ''}
            ${children}
        </div>
    `);

    if (isAuthorized) {
        card.find('.remove').on('click', onRemove);
        card.find('.edit').on('click', onEdit);
    }

    return card;
}
