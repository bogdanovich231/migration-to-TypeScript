export interface NewsApiResponse {
    status: string;
    totalResults: number;
    articles: NewsArticle[];
    sources: NewsSource;
}

export interface Item {
    name: string;
    id: string | null;
}
export interface NewsArticle extends Item {
    source: NewsSource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
    name: string;
    id: string | null;
}

export interface NewsSource {
    source: NewsSource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
    id: string | null;
    name: string;
}



