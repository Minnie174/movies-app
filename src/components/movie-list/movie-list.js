import React from "react";
import PropTypes from 'prop-types';
import MovieCard from "../movie-card";

import './movie-list.css';

const MovieList = ({movies, onChangeRating}) => {
    const movie = movies.map((el) => {
        return (
            <div key={el.id}>
                <MovieCard
                    image={el.poster_path}
                    title={el.title}
                    year={el.release_date}
                    genre={el.genre_ids}
                    info={el.overview}
                    rating={el.vote_average}
                    movies={movies}
                    id={el.id}
                    rate={el.rate}
                    onChangeRating={onChangeRating}
                />
            </div>
        )
    });

    return (
        <div className="movie-cards">
            {movie}
        </div>
    )
};

MovieList.defaultProps = {
    movies: [],
    onChangeRating: () => {}
}

MovieList.propTypes = {
    movies: PropTypes.arrayOf(Object),
    onChangeRating: PropTypes.func
}


export default MovieList;
