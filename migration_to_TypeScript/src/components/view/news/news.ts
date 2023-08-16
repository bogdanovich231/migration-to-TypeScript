import './news.css';
import { NewsArticle } from '../../interface/interfaceApi'

class News<T extends NewsArticle> {
    draw(data: T[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) {
                const news = newsClone.querySelector('.news__item');
                if (news instanceof HTMLElement) {
                    news.classList.add('alt');
                }
            }
            const newsPhoto = newsClone.querySelector('.news__meta-photo');
            if (newsPhoto instanceof HTMLElement) {
                newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }
            const newsAuthor = newsClone.querySelector('.news__meta-author');
            if (newsAuthor instanceof HTMLElement) {
                newsAuthor.textContent = item.author || item.source.name;
            }
            const newsDate = newsClone.querySelector('.news__meta-date');
            if (newsDate instanceof HTMLElement) {
                newsDate.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
            }
            const newsDescriptionTitle = newsClone.querySelector('.news__description-title');
            if (newsDescriptionTitle instanceof HTMLElement) {
                newsDescriptionTitle.textContent = item.title;
            }
            const newsDescriptionSource = newsClone.querySelector('.news__description-source');
            if (newsDescriptionSource instanceof HTMLElement) {
                newsDescriptionSource.textContent = item.source.name;
            }
            const newsDescriptionContent = newsClone.querySelector('.news__description-content');
            if (newsDescriptionContent instanceof HTMLElement) {
                newsDescriptionContent.textContent = item.description;
            }
            const newsReadLink = newsClone.querySelector('.news__read-more a');
            if (newsReadLink instanceof HTMLElement) {
                newsReadLink.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;