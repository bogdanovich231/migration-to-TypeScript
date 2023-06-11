import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=061aca91965445358b93ce15d016e915',
        });
    }
}

export default AppLoader;
