import React, { Component } from "react";
import { Tabs } from "antd";
import 'antd/dist/antd.css';
import {debounce} from "lodash";
import { GetGenresProvider, GetGenresConsumer } from "../../services/api-service-context";

import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import Notification from "../notification";

import MovieList from "../movie-list";
import PaginationMovie from "../pagination";
import Search from "../search/search";


import './app.css';
import MovieCard from "../movie-card";
import SwapiService from "../../services/swapi-service";

export default class App extends Component {

    apiService = new SwapiService();

    // maxId = 1;

    storage = window.localStorage;

    state = {
        movies: [],
        loading: false,
        error: false,
        isNotificate: false,
        totalPages: null, // общее количество страниц со всеми фильмами
        currentPage: 1, // менять при пагинации
        query: null, // тоже передаем в пагинацию (?), а нафига так-то..
        moviesPerPage: 10,
        totalResults: null,
        genress: {},
        rated: []
    }

    componentDidMount() {

        // делаем запрос к апи (?)
        // если локал не пустой, то записыааем в rated то, что там есть

        // const ifRated = this.storage.getItem('id') === 'true';
        //
        // console.log(ifRated)
        // this.setState(({rated}) => ({
        //     rated: 1
        // }))
        // try {
        //     this.getMovie()
        //         .then((movies) => {
        //             this.setState({
        //                 movies: movies.results,
        //                 totalPages: movies.total_pages
        //             })
        //             console.log(this.state.totalPages);
        //         })
        // }
        // catch {
        //     this.onError()
        //     console.log('catch, did')
        // }
    }

    onSearch = async (e) => {
        const search = e.target.value;
        this.setState({
            loading: true
        })
        try {
            const moviesList = await this.apiService.getMovie(search);
            const genresRes = await this.apiService.getGenre();
            this.setState(() => ({
                query: search,
                movies: moviesList.results,
                loading: false,
                totalPages: moviesList.total_pages,
                totalResults: moviesList.total_results,
                isNotificate: false,
                currentPage: 1,
                genress: genresRes
            }))
            if (moviesList.total_results === 0) {
                this.onNotificate()
            }

        } catch {
            this.onNotificate()
            console.log('catch')
        }
    } // ищем фильмы и впихиваем их в стейт

    onChangeRating = (id) => { // пихаем в локал и потом в отдельный стейт - формируем стейт с

        this.storage.setItem(id, 'true') // устанавливаем айди и ключ тру
        // если ключ в локал равен id в мувис, то мы его выводим.
        const movies1 = this.state.movies
        this.storage.setItem('movies', JSON.stringify(movies1)) // пихаем изначальный массив с фильмами в локал
        const value = JSON.parse(this.storage.getItem(id)) // true
        const x = JSON.parse(this.storage.getItem('movies')) // массив с объектами, которые нам надо перебрать и запихать в стейт с
        this.setState(({movies, rated}) => {
            const list = [];
            for (let i = 0; i < this.storage.length; i++) {
                // let yy = movies.map((el) => {
                //     const card = {...el} // карта одного фильма
                //     if (card.id === id) {
                //
                //     }
                //     const yyy = JSON.parse(this.storage.key(i))
                // })
                const xxx = this.storage.key(i)// айдишники выходят. теперь по ним нужно сравнивать
                list.push(xxx)
                console.log(list)
            }
            // this.storage.setItem('movies', newCard);
            // const xx = JSON.parse(this.storage.getItem('movies'))
            return {
                rated: list // запихались айдишники
            }
        })
        console.log(this.state.rated)

        const movies3 = []
        const y = x.filter((el) => el.id === id) // массив с объектом фильма, который нам надо запихнуть в другой массив. который в итоге запихнется в стейт
        const z = movies3.push(y)

        this.addRating(id)
    }

    handleRating = (id) => {
        console.log(id)
    }

    onTry(id) {
        const ifRated = this.storage.getItem(id) === 'true'; // надо достать карточки фильмап по айди и запихнуть их в стейт
        const moviesList = this.state.movies // из этого массива нам нужно достать фильм по айди и запихнуть в rated
        const newData = moviesList.map((el) => {
            return {...el}
        })
        console.log(newData)
        // прогоняем стейт через map, выводим только те, где id совпадает с card.id - формируем новый стейт
        const res1 = moviesList.map((el) => {
            const card = {...el} // один элемент
            console.log(card)
            if (card.id === id) {
                this.setState(() => ({rated: card}))
            }
            return card
        })
        console.log(res1, this.state.rated)
        // const res = moviesList.filter(el => ifRated ? this.setState(() => ({rated: el})) : [])
        // console.log(res)
        console.log(ifRated) // по айди нам нужно вытащить фильмы, которые ему соответствуют и запихнуть в стейт rated.


        const mov = this.state.movies
        const mov2 = mov.map(elem => elem.id) //  нам нужно вывести конкретный айди и его сохранить в локал - выцеплять айдишник.
    } // написать функцию, по которой мы будем вытаскивать key и по нему сохранять элемент в локал
    // id запихивать теперь в localStorage. потом смотреть, какие айди лежат в локал и запихивать их в новый стейт. Если в локал есть эти айди, то выводить их в новый стейт (через мап мб).

    addRating = (id) => {
        console.log(id)
        return id
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    } // обрабатывает ошибки

    onNotificate = () => {
        this.setState({
            isNotificate: true
        })
    } // уведомление, что фильм не найден

    onChangePage = async (curr=1) => { // меняем стейт в зависимости от страницы
        const search1 = this.state.query
        this.setState({
            loading: true
        })
        const movies2 = await this.apiService.nextPage(search1, curr)
        this.setState(() => ({
            movies: movies2.results,
            currentPage: curr,
            query: search1,
            isNotificate: false,
            loading: false,
            totalPages: movies2.total_pages,
            totalResults: movies2.total_results,
        }))
    }

    render() {
        const { error, loading, movies, currentPage, moviesPerPage, isNotificate, totalResults, totalPages } = this.state
        const { TabPane } = Tabs;

        const lastMovieIndex = currentPage * moviesPerPage
        const first = lastMovieIndex - moviesPerPage
        const current = movies.slice(first, lastMovieIndex)

        const hasData = !(loading || error);

        const spinner = loading ? <Spinner /> : null; // можно использовать в коде
        const content = !loading ? <MovieList movies={movies}/> : null
        const errorMessage = error ? <ErrorIndicator /> : null
        const notification = isNotificate ? <Notification /> : null

        // if (loading) {
        //     return <Spinner />
        // }

        // if (error) {
        //     return <ErrorIndicator />
        // }

        return (
            <div className="wrapper">
                <GetGenresProvider value={this.state.genress}>
                <Tabs className="tabs" defaultActiveKey="1" centered>
                    <TabPane classname="tab-pane" tab="Search" key="1">
                        {spinner}
                    </TabPane>
                    <TabPane classname="tab-pane" tab="Rated" key="2">
                        Hey
                    </TabPane>
                </Tabs>
                <div>
                    <Search onMovie={this.onSearch}/>
                </div>
                {spinner}
                <MovieList movies={movies}
                           onChangeRating={this.onChangeRating}
                           onChangeR={this.handleRating}
                           onClickStar={this.onClickStar}
                           />
                {notification}
                <PaginationMovie moviesPerPage={moviesPerPage}
                                 totalMovies={totalResults}
                                 onClickPage={this.onChangePage}
                />
                </GetGenresProvider>
            </div>
        )
    };
};


