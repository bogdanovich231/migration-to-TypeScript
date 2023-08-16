import AppController from '../controller/controller';
import AppView from '../view/appView';
import { NewsApiResponse} from '../interface/interfaceApi';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView(this.controller);
    }

    public start(): void {
        this.view.initialize();
        this.controller.getSources((data: NewsApiResponse) => {
            this.view.drawSources(data.sources);
        });
    }
}

export default App;
