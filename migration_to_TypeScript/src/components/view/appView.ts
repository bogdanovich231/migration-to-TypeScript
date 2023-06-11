import News, { Item as NewsItem } from './news/news';
import Sources, { Item as SourcesItem } from './sources/sources';

export interface DrawNews {
    articles: NewsItem[];

}

export interface DrawSources {
    sources: SourcesItem[];
}

export class AppView {
    private news: News<NewsItem>;
    private sources: Sources<SourcesItem>;
    constructor() {
        this.news = new News<NewsItem>();
        this.sources = new Sources<SourcesItem>();
    }

    public drawNews(data: DrawNews): void {
        const values = data?.articles ? data.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: DrawSources): void {
        const values = data?.sources ? data.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
