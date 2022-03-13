export default class SwapiService {

    apiBase = 'https://api.themoviedb.org/3/';

    apiKey = '58ef46feba513b0472d131fa50c82f3b';

    imageUrl = 'https://image.tmdb.org/t/p/w500';

    async getResource(url) {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}`+` received ${res.status}`)
        }
        const body = await res.json();
        return body;
    }

    async getJack() {
        const res1 = await this.getResource(`${this.apiBase}search/movie?api_key=${this.apiKey}&query=Jack`);
        console.log(res1)
        return res1;
    }

    async getMovie(query) {
        const res2 = await this.getResource(`${this.apiBase}search/movie?api_key=${this.apiKey}&query=${query}`);
        return res2;
    } // получаем фильмы по поиску

    async nextPage(query, pageNum) {
        const res3 = await this.getResource(`${this.apiBase}search/movie?api_key=${this.apiKey}&query=${query}&page=${pageNum}`);
        console.log(res3);
        return res3;
    } // переключает пагинацию

    async getGenre() {
        const res4 = await this.getResource(`${this.apiBase}genre/movie/list?api_key=${this.apiKey}`)
        return res4.genres;
    } // выводит массив с жанрами
};