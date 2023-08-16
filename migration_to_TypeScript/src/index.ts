import App from './components/app/app';
import './global.css';

class CustomApp extends App {
    public start(): void {
        super.start();
    }
}

const app = new CustomApp();
app.start();
