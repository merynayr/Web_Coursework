import { socket } from '../../socket'; // Подразумевается, что этот файл находится в двух уровнях выше, проверьте путь
import { motion } from 'framer-motion';
import './NoItems.css';

const createNoItemsComponent = ({ title, UpdateButton = true, socketEmitEndpoint = 'isFlightsUpdate' }) => {
    const container = document.createElement('div');
    container.className = 'no-items';

    const innerContainer = document.createElement('div');
    innerContainer.className = 'no-items__container';
    container.appendChild(innerContainer);

    const titleElement = document.createElement('div');
    titleElement.className = 'title';
    titleElement.textContent = title;
    innerContainer.appendChild(titleElement);

    if (UpdateButton) {
        const updateButton = document.createElement('button');
        updateButton.className = 'update';
        updateButton.textContent = 'Обновить';

        // Добавление эффектов анимации
        motion(updateButton, {
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 }
        });

        updateButton.addEventListener('click', () => {
            socket.emit(socketEmitEndpoint, { status: true });
        });

        innerContainer.appendChild(updateButton);
    }

    return container;
};

export default createNoItemsComponent;
