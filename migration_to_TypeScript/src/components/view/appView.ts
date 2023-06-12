import News from './news/news';
import Sources from '../view/news/news';
import { NewsArticle, NewsSource } from '../interface/interfaceApi'

import { NewsApiResponse } from '../interface/interfaceApi';

export class AppView {
    private news: News<NewsArticle>;
    private sources: Sources<NewsArticle>;

    constructor() {
        this.news = new News<NewsArticle>();
        this.sources = new Sources<NewsArticle>();
    }

    public drawNews(data: NewsApiResponse): void {
        const values = data?.articles ? data.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: NewsSource[]): void {
        const values = data || [];
        this.sources.draw(values);
    }
}

export default AppView;
