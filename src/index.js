import React from "react";
import ReactDOM from 'react-dom';

import App from "./components/app";

ReactDOM.render(<App />, document.getElementById('root'));

console.log('hello woek');
localStorage.clear()

// const x = fetch('https://api.themoviedb.org/3/search/movie?api_key=58ef46feba513b0472d131fa50c82f3b&query=Jack')
//     .then((res) => {
//         return res.json();
//     })
//     .then((body) => {
//         const movie = body.results;
//         movie.forEach(elem => console.log(elem.poster_path))
//     })


// getResource('https://api.themoviedb.org/3/search/movie?api_key=58ef46feba513b0472d131fa50c82f3b&query=Jack+Reacher')
//     .then((res) => {
//         console.log(res)
//     });

// const x = fetch('https://api.themoviedb.org/3/search/movie?api_key=58ef46feba513b0472d131fa50c82f3b&query=Jack+Reacher')
//     .then((res) => {
//         return res.json();
//     })
//     .then((body) => {
//         console.log(body);
//     });
//
//
// console.log(x);
