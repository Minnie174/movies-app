import React, { Component } from "react";
import { Tabs } from "antd";
import 'antd/dist/antd.css';
import { GetGenresProvider } from "../../services/api-service-context";

import Spinner from "../spinner";
import Notification from "../notification";

import MovieList from "../movie-list";
import PaginationMovie from "../pagination";
import Search from "../search/search";

import './app.css';

import SwapiService from "../../services/swapi-service";

export default class App extends Component {

    apiService = new SwapiService();

    storage = window.localStorage;

    state = {
        movies: [],
        loading: false,
        error: false,
        isNotificate: false,
        pagination: 'search',
        totalPages: null, // общее количество страниц со всеми фильмами
        currentPage: 1, // менять при пагинации
        query: null, // тоже передаем в пагинацию (?), а нафига так-то..
        moviesPerPage: 10,
        totalResults: null,
        genress: {},
        rated: []
    }

    onChangeRating = async (id) => { // пихаем рейтинг в стейт!!

        const value = this.storage.getItem(id)

        await this.setState(({movies}) => {
            const moviesList = movies.map((el) => {
                const card = {...el}
                if (card.id === id) {
                    if (!card.rate) {
                        card.rate = value
                    }
                }
                this.storage.setItem('movies', JSON.stringify(this.state.movies))
                return card;
            })

            const ratedData = moviesList.filter(el => el.rate);

            return {
                movies: moviesList,
                rated: ratedData
            }
        })
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
        }
    } // ищем фильмы и впихиваем их в стейт

    onError = () => {
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

    // onChangePageRated = async (curr) => {
    //     await this.setState(({totalResults: this.state.rated.length}))
    //     console.log(this.state.pagination)
    //     console.log(curr)
    // }
    //
    // onChangeTab = async (key, e) => {
    //     if (key === '1') {
    //         await this.setState(({pagination: 'search'}))
    //     } else {
    //         await this.setState(({pagination: 'rated'}))
    //     }
    // }

    render() {
        const { loading, movies, moviesPerPage, isNotificate, totalResults, rated } = this.state
        const { TabPane } = Tabs;

        const spinner = loading ? <Spinner /> : null;
        const notification = isNotificate ? <Notification /> : null

        return (
            <div >
                <GetGenresProvider value={this.state.genress}>
                    <div className="wrapper">
                        <Tabs className="tabs" defaultActiveKey="1" onTabClick={this.onChangeTab} centered>
                            <TabPane classname="tab-pane" tab="Search" key="1">
                                <div>
                                    <Search onMovie={this.onSearch}/>
                                </div>
                                {spinner}
                                <MovieList movies={movies}
                                           onChangeRating={this.onChangeRating}
                                />
                                {notification}
                                <PaginationMovie moviesPerPage={moviesPerPage}
                                                 totalMovies={totalResults}
                                                 onClickPage={this.onChangePage}
                                />
                            </TabPane>
                            <TabPane classname="tab-pane" tab="Rated" key="2">
                                <MovieList movies={rated}
                                           onChangeRating={this.onChangeRating}
                                />
                                {notification}
                            </TabPane>
                        </Tabs>
                    </div>
                </GetGenresProvider>
            </div>
        )
    };
};


