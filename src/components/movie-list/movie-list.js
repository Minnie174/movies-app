import React from "react";

import MovieCard from "../movie-card";

import './movie-list.css';

const MovieList = ({movies}) => {
    return (
        <div className="movie-cards">
        {movies.map((movie) => (
                <MovieCard />
            ))}
        </div>
    )
};
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
