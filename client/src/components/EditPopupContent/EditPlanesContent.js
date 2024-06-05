import { endpoints } from '../../api/index.js';
import { closePopup } from '../Popups/Popup.js';

export async function saveChanges(formData, planeId) {
    try {
        const res = await fetch(`${endpoints.SERVER_ORIGIN_URI}${endpoints.PLANES.ROUTE}${endpoints.PLANES.CHANGE}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...formData, id: planeId })
        });

        const data = await res.json();

        if (data.error) {
            toastError('Не удалось сохранить изменения');
        } else {
            toastSuccess("Изменения успешно сохранены!");
            closePopup("#editItemPopup");
            fetchPlanes();
        }
    } catch (error) {
        console.error("Error saving changes:", error);
        toastError('Не удалось сохранить изменения');
    }
}
