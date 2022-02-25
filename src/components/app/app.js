import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import { Tabs } from "antd";
import 'antd/dist/antd.css';
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

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
        error: false
    }

    async componentDidMount() {
        const res9 = await this.getMovie();
        console.log(res9)

        this.setState(({movies}) => ({
            movies: res9
        }));
    }

    getMovie = async () => {
        const movies = await this.apiService.getJack();
        return movies;
    } // массив с фильмами

    onError = (err) => {
        this.setState({
            error: true
        })
    } // обрабатывает ошибки

    render() {
        const { TabPane } = Tabs;
        if (this.state.loading) {
            return <Spinner />
        }

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
                    <Search />
                </div>
                <MovieList movies={this.state.movies}
                />
            </div>
        )
    };
};


