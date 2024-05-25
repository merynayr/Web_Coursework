import EditAdminsContent from '../EditPopupContent/EditAdminsContent';
import EditAirportsContent from '../EditPopupContent/EditAirportsContent';
import EditFlightsContent from '../EditPopupContent/EditFlightsContent';
import EditPassengersContent from '../EditPopupContent/EditPassengersContent';
import EditPlanesContent from '../EditPopupContent/EditPlanesContent';
import Popup from './Popup';
import closeButton from "../../assets/popup/close.svg";

const EditItemContent = ({ itemCategory, data, popupHandlerFunc }) => {
    const categories = {
        'flights': EditFlightsContent,
        'airports': EditAirportsContent,
        'admins': EditAdminsContent,
        'passengers': EditPassengersContent,
        'planes': EditPlanesContent
    };

    return new categories[itemCategory]({ data, popupHandlerFunc });
};

const EditItem = ({ title, popupHandlerFunc, itemCategory, data }) => {
    const popupHandler = () => popupHandlerFunc((prev) => !prev);

    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup');

    const popupContent = document.createElement('div');
    popupContent.classList.add('popup__container');

    popupContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    const popupHead = document.createElement('div');
    popupHead.classList.add('popup__container__head');

    const headTitle = document.createElement('div');
    headTitle.classList.add('head__title');
    headTitle.textContent = title;

    const headClose = document.createElement('div');
    headClose.classList.add('head__close');
    headClose.addEventListener('click', popupHandler);

    const closeImage = document.createElement('img');
    closeImage.src = closeButton;
    closeImage.alt = 'close';

    headClose.appendChild(closeImage);

    popupHead.appendChild(headTitle);
    popupHead.appendChild(headClose);

    const popupBody = document.createElement('div');
    popupBody.classList.add('popup__container__body');
    popupBody.appendChild(new EditItemContent({ itemCategory, data, popupHandlerFunc }).render());

    popupContent.appendChild(popupHead);
    popupContent.appendChild(popupBody);

    popupContainer.appendChild(popupContent);

    popupContainer.addEventListener('click', popupHandler);

    return popupContainer;
};

export default EditItem;
