import AppController from '../controller/controller';
import { AppView } from '../view/appView';

interface newsData {

}

interface sourceData {

}
class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        document.querySelector('.sources');
        document.addEventListener('click', (e: Event) => this.controller.getNews(e, (data: newsData) => this.view.drawNews(data)));
        this.controller.getSources((data: sourceData) => this.view.drawSources(data));
    }
}

export default App;