import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Rate, Tag } from "antd";
import { format } from 'date-fns';
import { GetGenresConsumer } from "../../services/api-service-context";

import './movie-card.css';
import SwapiService from "../../services/swapi-service";

const apiService = new SwapiService();

export default class MovieCard extends Component {

    onRatedMovies = (value) => {
        localStorage.setItem(this.props.id, JSON.stringify(value))
        this.props.onChangeRating(this.props.id);
    }

    getDate = (dateRelease) => {
        if (dateRelease === null || dateRelease === "" || dateRelease === undefined) {
            return 'Movie id really old'
        }
        const res = format(new Date(dateRelease), 'MMMM dd, yyyy')
        return res
    }

    getGenre = (arr, num) => {
        const res2 = arr.filter(el => num.includes(el.id));
        const res3 = res2.map(elem => elem.name)
        return res3.join(', ')
    }

    render() {
        const {image, title, year, genre, info, rating, rate} = this.props;

        const picture = image === null ? '/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg' : image // заглушка

            return (
                <div className="movie">
                    <img alt="Poster" className="poster" src={`https://image.tmdb.org/t/p/w500${picture}`}/>
                    <div className="description">
                        <div className="title">{title}</div>
                        <div className="rating">
                            <span className="rate">{rating}</span>
                        </div>
                        <div className="year">{this.getDate(year)}</div>
                        <GetGenresConsumer>
                            {value =>
                                <div className="genre">
                                    <Tag>
                                        {this.getGenre(value, genre)}
                                    </Tag>
                                </div>
                            }
                        </GetGenresConsumer>
                        <div className="info">{info}
                        </div>
                        <Rate className="rate-tab"
                              count={5}
                              value={rate}
                              onChange={this.onRatedMovies}
                        />
                    </div>
                </div>
            )

    }
};

MovieCard.defaultProps = {
    image: '',
    title: '',
    year: '',
    genre: [],
    info: '',
    rating: 0,
    id: 0,
}

MovieCard.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.string,
    genre: PropTypes.arrayOf(Object),
    info: PropTypes.string,
    rating: PropTypes.number,
    id: PropTypes.number,
}
