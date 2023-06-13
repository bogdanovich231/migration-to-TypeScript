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
        this.newsContainer = document.querySelector('.news');
        this.sourcesContainer = document.querySelector('.sources');

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

            const title = document.createElement('h2');
            title.classList.add('news__description-title');
            title.textContent = article.title;

            const source = document.createElement('h3');
            source.classList.add('news__description-source');
            source.textContent = article.source.name;

            const content = document.createElement('p');
            content.classList.add('news__description-content');
            content.textContent = article.description;

            newsItem.appendChild(title);
            newsItem.appendChild(source);
            newsItem.appendChild(content);

            this.newsContainer!.appendChild(newsItem);
        });
    }

    public drawSources(data: NewsSource[]): void {
        if (!this.sourcesContainer) {
            return;
        }

        this.sourcesContainer.innerHTML = '';

        data.forEach((source) => {
            const sourceItem = document.createElement('button');
            sourceItem.classList.add('source__item');
            sourceItem.setAttribute('data-source-id', source.id ?? '');
            sourceItem.textContent = source.name;

            sourceItem.addEventListener('click', (event: Event) => {
                const sourceId = this.getSourceIdFromEvent(event, '.source__item');
                if (sourceId) {
                    this.controller.getNews(sourceId, (data: NewsApiResponse) => {
                        const articles: NewsArticle[] = data.articles || [];
                        this.drawNews(articles);
                    });
                }
            });

            this.sourcesContainer!.appendChild(sourceItem);
        });
    }
}

export default AppView;
