import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import 'antd/dist/antd.css';

import MovieList from "../movie-list";
import Pagination from "../pagination";
import Search from "../search/search";

import './app.css';
import MovieCard from "../movie-card";
import SwapiService from "../../services/swapi-service";

export default class App extends Component {

    // state = {
    //     movies: ["1", "2"]
    // };

    apiService = new SwapiService();

    maxId = 1;

    // state = {
    //     movies: {
    //         image: null,
    //         title: null,
    //         year: null,
    //         genre: null,
    //         info: null
    //     }
    // }

    state = {
        movies: []
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

    render() {
        // const { movies } = this.state;

        return (
            <div className="wrapper">
                <div>
                    <header />
                </div>
                <MovieList movies={this.state.movies}
                           update={this.updateMovies}
                />
            </div>
        )
    };
};

// export default class App extends Component {
//     render() {
//         return (
//             <div className="wrapper">
//                 <div>
//                     <header />
//                 </div>
//                 <MovieList />
//             </div>
//             )
//     }
// };

