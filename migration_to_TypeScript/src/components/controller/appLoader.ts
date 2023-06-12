import Loader, { BaseLink, Options } from './loader';
import { NewsApiResponse } from '../interface/interfaceApi';

class AppLoader extends Loader<NewsApiResponse> {
    constructor() {
        const baseLinks: BaseLink[] = [
            {
                url: "https://news-proxy.spanb4.shop/",
                apiKey: "061aca91965445358b93ce15d016e915",
            },
            {
                url: "https://news-proxy.spanb4.shop/",
                apiKey: "061aca91965445358b93ce15d016e915",
            },
        ];

        let successfulRequest = false;
        let currentLinkIndex = 0;
        const options: Options = {
            apiKey: baseLinks[currentLinkIndex].apiKey,
        };

        while (!successfulRequest && currentLinkIndex < baseLinks.length) {
            try {
                super(baseLinks[currentLinkIndex], options);
                successfulRequest = true;
            } catch (error) {
                console.log(`Error occurred with link ${currentLinkIndex}: ${error}`);
                currentLinkIndex++;
                if (currentLinkIndex < baseLinks.length) {
                    options.apiKey = baseLinks[currentLinkIndex].apiKey;
                }
            }
        }

        if (!successfulRequest) {
            console.error('All links failed. Unable to make a successful request.');
        }
    }
}

export default AppLoader;
