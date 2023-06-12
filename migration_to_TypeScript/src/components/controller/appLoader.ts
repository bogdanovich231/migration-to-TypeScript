import Loader from './loader';
import { NewsApiResponse } from '../interface/interfaceApi'

class AppLoader extends Loader<NewsApiResponse> {
    constructor() {
        super({ link: 'https://newsapi.org/v2/' }, {
            apiKey: 'https://newsapi.org/v2/everything?q=tesla&from=2023-05-12&sortBy=publishedAt&apiKey=061aca91965445358b93ce15d016e915',
        });
    }
}

export default AppLoader;
