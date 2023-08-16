import './sources.css';
import { Item } from '../../interface/interfaceApi';

class Sources<T extends Item> {
    draw(data: T[]): void {
        const sourcesContainer = document.querySelector('.sources');
        if (!sourcesContainer) {
            return;
        }

        data.forEach((item) => {
            const sourceItem = document.createElement('button');
            sourceItem.classList.add('source__item');
            sourceItem.setAttribute('data-source-id', item.id ?? '');
            sourceItem.textContent = item.name;

            sourcesContainer.appendChild(sourceItem);
        });
    }
}

export default Sources;
