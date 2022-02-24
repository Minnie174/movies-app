import React from "react";

import MovieCard from "../movie-card";

import './movie-list.css';

const MovieList = ({movies}) => {
    const movie = movies.map((el) => {
        return (
            <div key={el.id}>
                <MovieCard
                    image={el.poster_path}
                    title={el.title}
                    year={el.release_date}
                    genre={el.genre_ids}
                    info={el.overview}
                    movies={movies}
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

// const MovieList = ({movies}) => {
//     return (
//         <div className="movie-cards">
//         {movies.map((movie) => (
//                 <MovieCard />
//             ))}
//         </div>
//     )
// };

// const MovieList = ({movies}) => {
//     const movie = movies.map((el) => {
//         const {id, ...itemProps} = el;
//         return (
//         <MovieCard title={el.title}
//                    image={el.image}
//                    year={el.year}
//                    genre={el.genre}
//                    info={el.info}/>
//         )})
//     return (
//         <div className="movie-cards">
//             {movie}
//         </div>
//     )
// };

export default MovieList;
