import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import 'antd/dist/antd.css';

import MovieList from "../movie-list";
import Pagination from "../pagination";
import Search from "../search/search";

import './app.css';
import MovieCard from "../movie-card";

export default class App extends Component {

    state = {
        movies: ["1", "2"]
    };

    render() {
        const { movies } = this.state;

        return (
            <div className="wrapper">
                <div>
                    <header />
                </div>
                <MovieList movies={movies}/>
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

