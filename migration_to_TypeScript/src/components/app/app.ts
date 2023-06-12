import AppController from '../controller/controller';
import AppView from '../view/appView';
import { NewsApiResponse } from '../interface/interfaceApi';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        document.addEventListener('click', (e: Event) =>
            this.controller.getNews(e, (data: NewsApiResponse) => this.view.drawNews(data))
        );

        this.controller.getSources((data: NewsApiResponse) => this.view.drawSources([data.sources]));
    }
}

export default App;
