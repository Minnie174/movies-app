import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";

import './movie-card.css';

// const MovieCard = ({image, title, year, genre, info}) => {
//
//
//     return (
//         <div className="movie">
//             <img alt="Poster" className="poster" src={`https://image.tmdb.org/t/p/w500${image}`} />
//             <div className="description">
//                 <div className="title">{title}</div>
//                 <div className="year">{year}</div>
//                 <div className="genre">{genre}</div>
//                 <div className="info">{info}
//                 </div>
//             </div>
//         </div>
//     )
// };
//
// export default MovieCard;

// eslint-disable-next-line react/prefer-stateless-function
export default class MovieCard extends Component {

    swapiService = new SwapiService();

    state = {
        // eslint-disable-next-line no-unused-vars
        image: null,
        title: null,
        year: null,
        genre: null,
        info: null
    }

    constructor() {
        super();
        this.updateMovie();
    }

    updateMovie() {
        this.swapiService.getJack().then((res) => res.forEach((p) => {
            this.setState({
                image: p.poster_path,
                title: p.title,
                year: p.release_date,
                genre: p.genre_ids,
                info: p.overview
            })
        }));
    }

    render() {
        const { image, title, year, genre, info } = this.props;
        return (
            <div className="movie">
                             <img alt="Poster" className="poster" src={`https://image.tmdb.org/t/p/w500${this.state.image}`} />
                             <div className="description">
                                 <div className="title">{this.state.title}</div>
                                 <div className="year">{this.state.year}</div>
                                 <div className="genre">{this.state.genre}</div>
                                 <div className="info">{this.state.info}
                                 </div>
                             </div>
                         </div>
        )
    }
};