import { NewsArticle, NewsSource, NewsApiResponse } from '../interface/interfaceApi';
import AppController from '../controller/controller';

class AppView {
    private newsContainer: HTMLElement | null;
    private sourcesContainer: HTMLElement | null;
    private controller: AppController;

    constructor(controller: AppController) {
        this.newsContainer = null;
        this.sourcesContainer = null;
        this.controller = controller;
    }

    public initialize(): void {
        this.newsContainer = document.querySelector('#newsItemTemp');
        this.sourcesContainer = document.querySelector('#sourceItemTemp .sources');

        if (this.sourcesContainer) {
            this.sourcesContainer.addEventListener('click', (event: Event) => {
                const sourceId = this.getSourceIdFromEvent(event, '.source__item');
                if (sourceId) {
                    this.controller.getNews(sourceId, (data: NewsApiResponse) => {
                        this.drawNews(data.articles);
                    });
                }
            });
        }
    }
    private getSourceIdFromEvent(event: Event, selector: string): Event | null {
        const sourceItem = (event.target as HTMLElement).closest(selector) as HTMLElement | null;
        if (sourceItem) {
            return event;
        }
        return null;
    }
    public drawNews(data: NewsArticle[]): void {
        if (!this.newsContainer) {
            return;
        }

        this.newsContainer.innerHTML = '';

        data.forEach((article) => {
            const newsItem = document.createElement('div');
            newsItem.classList.add('news__item');

            const meta = document.createElement('div');
            meta.classList.add('news__meta');

            const metaPhoto = document.createElement('div');


            if (article.urlToImage) {
                const photo = document.createElement('img');
                photo.classList.add('news__meta-photo');
                photo.src = article.urlToImage;
                meta.appendChild(photo);
            }

            const metaDetails = document.createElement('ul');
            metaDetails.classList.add('news__meta-details');

            const metaAuthor = document.createElement('li');
            metaAuthor.classList.add('news__meta-author');

            const metaDate = document.createElement('li');
            metaDate.classList.add('news__meta-date');

            const description = document.createElement('div');
            description.classList.add('news__description');

            const title = document.createElement('h2');
            title.classList.add('news__description-title');
            title.textContent = article.title;

            const source = document.createElement('h3');
            source.classList.add('news__description-source');
            source.textContent = article.source.name;

            const content = document.createElement('p');
            content.classList.add('news__description-content');
            content.textContent = article.description;

            const readMore = document.createElement('p');
            readMore.classList.add('news__read-more');

            const link = document.createElement('a');
            link.href = '#';
            link.textContent = 'Read More';

            readMore.appendChild(link);

            metaDetails.appendChild(metaAuthor);
            metaDetails.appendChild(metaDate);

            meta.appendChild(metaPhoto);
            meta.appendChild(metaDetails);

            description.appendChild(title);
            description.appendChild(source);
            description.appendChild(content);
            description.appendChild(readMore);

            newsItem.appendChild(meta);
            newsItem.appendChild(description);

            if (this.newsContainer) {
                this.newsContainer.appendChild(newsItem);
            }
        });
    }

    public drawSources(data: NewsSource[]): void {
        if (!this.sourcesContainer) {
            return;
        }

        this.sourcesContainer.innerHTML = '';

        data.forEach((source) => {
            const sourceItem = document.createElement('div');
            sourceItem.classList.add('source__item');
            sourceItem.setAttribute('data-source-id', source.id ?? '');

            const sources = document.querySelector('#sourceItemTemp .sources');
            if (sources) {
                sources.appendChild(sourceItem);
            }

            const sourceName = document.createElement('span');
            sourceName.classList.add('source__item-name');
            sourceName.textContent = source.name;

            sourceItem.appendChild(sourceName);

            sourceItem.addEventListener('click', (event: Event) => {
                const sourceId = this.getSourceIdFromEvent(event, '.source__item');
                if (sourceId) {
                    this.controller.getNews(sourceId, (data: NewsApiResponse) => {
                        const articles: NewsArticle[] = data.articles || [];
                        this.drawNews(articles);
                    });
                }
            });
        });
    }
}

export default AppView;
