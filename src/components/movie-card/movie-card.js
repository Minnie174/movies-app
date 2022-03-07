import React, { Component } from "react";
import { Rate, Tag } from "antd";
import { format } from 'date-fns';
import { GetGenresConsumer } from "../../services/api-service-context";

import './movie-card.css';
import SwapiService from "../../services/swapi-service";

const apiService = new SwapiService();

const MovieCard = ({image, title, year, genre, info, rating, onChangeRating}) => {

    // в тэг надо передавать пропсы по жанрам - для этого надо получать жанры в отдельной функции в апишке - получаем.

    const date = (dateRelease) => {
        if (dateRelease === null || dateRelease === "" || dateRelease === undefined) {
            return 'Movie id really old'
        }
        const res = format(new Date(dateRelease), 'MMMM dd, yyyy')
        return res
    }

    const picture = image === null ? '/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg' : image // заглушка

    const getGenre = (arr, num) => {
        // console.log(arr) // массив с объектом и числами - его сравнивать с тем, что у нас уже есть
        // console.log(num) // массив того, что у нас есть - каждое число нужно прогнать через фильтр.

        const res2 = arr.filter(el => num.includes(el.id));
        const res3 = res2.map(elem => elem.name)
        return res3.join(', ')
         // мы выводим только те объекты, где есть эти числа. а в тэг выводим значение name
         // промис
        // здесь нам нужен массив со всеми жанрами, из которого мы вытащим только те, которые нужны нам - то есть, его нужна передать из апп?
        // приводим к строке через запятую, прогоняем через filter и map (?) выводим из айпишки числа и name. И выводим name в тэг.
    }

    return (
        <div className="movie">
            <img alt="Poster" className="poster" src={`https://image.tmdb.org/t/p/w500${picture}`} />
            <div className="description">
                <div className="title">{title}</div>
                <div className="rating">
                    <span className="rate">{rating}</span>
                </div>
                <div className="year">{date(year)}</div>
                <GetGenresConsumer>
                    {value =>
                        <div className="genre">
                                <Tag>
                                    {getGenre(value, genre)}
                                </Tag>
                        </div>
                    }
                </GetGenresConsumer>
                <div className="info">{info}
                </div>
                <Rate className="rate-tab" onChange={onChangeRating}/>
            </div>
        </div>
    )
};

export default MovieCard;

// eslint-disable-next-line react/prefer-stateless-function
// export default class MovieCard extends Component {
//
//     swapiService = new SwapiService();
//
//     state = {
//         // eslint-disable-next-line no-unused-vars
//         image: null,
//         title: null,
//         year: null,
//         genre: null,
//         info: null
//     }
//
//     constructor() {
//         super();
//         this.updateMovie();
//     }
//
//     updateMovie() {
//         this.swapiService.getJack().then((res) => res.forEach((p) => {
//             this.setState({
//                 image: p.poster_path,
//                 title: p.title,
//                 year: p.release_date,
//                 genre: p.genre_ids,
//                 info: p.overview
//             })
//         }));
//     }
//
//     render() {
//         const { image, title, year, genre, info } = this.props;
//         return (
//             <div className="movie">
//                              <img alt="Poster" className="poster" src={`https://image.tmdb.org/t/p/w500${this.state.image}`} />
//                              <div className="description">
//                                  <div className="title">{this.state.title}</div>
//                                  <div className="year">{this.state.year}</div>
//                                  <div className="genre">{this.state.genre}</div>
//                                  <div className="info">{this.state.info}
//                                  </div>
//                              </div>
//                          </div>
//         )
//     }
// };