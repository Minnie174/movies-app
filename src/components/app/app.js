import React, { Component } from "react";
import { Tabs } from "antd";
import 'antd/dist/antd.css';
import {debounce} from "lodash";

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

    maxId = 1;

    state = {
        movies: [],
        loading: false,
        error: false,
        isNotificate: false,
        totalPages: null, // общее количество страниц со всеми фильмами
        currentPage: 1, // менять при пагинации
        query: null, // тоже передаем в пагинацию (?), а нафига так-то..
        moviesPerPage: 10,
        totalResults: null
    }

    componentDidMount() {
        try {
            this.getMovie()
                .then((movies) => {
                    this.setState({
                        movies: movies.results,
                        totalPages: movies.total_pages
                    })
                    console.log(this.state.totalPages);
                })
        }
        catch {
            this.onError()
        }
    }

    onSearch = async (e) => {
        const search = e.target.value;
        this.setState({
            loading: true
        })
        try {
            const movies1 = await this.apiService.getMovie(search);
            console.log(movies1)
            this.setState(() => ({
                query: search,
                movies: movies1.results,
                loading: false,
                totalPages: movies1.total_pages,
                totalResults: movies1.total_results,
                isNotificate: false,
                currentPage: 1
            }))
            if (movies1.total_results === 0) {
                this.onNotificate()
            }

        } catch {
            this.onNotificate()
            console.log('catch')
        }
    } // ищем фильмы и впихиваем их в стейт

    getJackMovie = async () => {
        const movies = await this.apiService.getJack();
        return movies;
    } // массив с фильмами - потом убрать; раньше был в ComponentDidMount

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

    getSearch = debounce((event) => {
        console.log(event.target.value)
        const targetValue = event.target.value
        this.setState({searchMovie: targetValue})
    }, 700); // получаем результат поиска

    // getPag = async () => {
    //     console.log(this.state.searchMovie)
    //     const mov = await this.apiService.getMovie(this.state.searchMovie);
    //     console.log(mov)
    // }

    onChangePage = async (curr=1) => { // менять стейт в зависимости от страницы. нужен fetch-запрос (принимает .target.value и pageNum).
        const search1 = this.state.query // получаем запрос из поиска, чтобы вставить в fecht
        // if (search1 === null) {
        //     return null;
        // }
        this.setState({
            loading: true
        })

        console.log(this.state.query)
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
        console.log(this.state.totalResults)
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
                <Tabs className="tabs" defaultActiveKey="1" centered>
                    <TabPane tab="Search" key="1">
                        Key
                    </TabPane>
                    <TabPane tab="Rated">
                        Hey
                    </TabPane>
                </Tabs>
                <div>
                    <Search onMovie={this.onSearch}/>
                </div>
                {spinner}
                <MovieList movies={movies}
                           />
                {notification}
                <PaginationMovie moviesPerPage={moviesPerPage}
                                 totalMovies={totalResults}
                                 onClickPage={this.onChangePage}
                />
            </div>
        )
    };
};


