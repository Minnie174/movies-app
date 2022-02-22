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
        return res1.results;
    }

    async getPosterPath() {
        const res2 = await this.getResource(`${this.apiBase}search/movie?api_key=${this.apiKey}&query=Jack`);
        const poster = res2.results;
        return poster.forEach(elem => elem.poster_path)
        // return this.getJack().then((res) => res.forEach((elem) => elem.poster_path)); forEach(elem => elem.poster_path)
    }

    async getPicture() {
        const res3 = await this.getResource(`${this.imageUrl}`)
    }
};