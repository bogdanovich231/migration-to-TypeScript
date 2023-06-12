import AppController from '../controller/controller';
import AppView from '../view/appView';
import { NewsApiResponse, NewsSource, NewsArticle } from '../interface/interfaceApi';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const newsContainer = document.querySelector('.news');
        document.addEventListener('click', (e: Event) =>
            this.controller.getNews(e, (data: NewsApiResponse) => this.view.drawNews(data))
        );

        this.controller.getSources((data: NewsApiResponse) => this.view.drawSources([data.sources]));
    }
}

export default App;
