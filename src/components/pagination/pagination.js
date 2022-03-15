import React from "react";
import PropTypes from 'prop-types';
import { Pagination } from "antd";

import './pagination.css';

const PaginationMovie = ({onClickPage, moviesPerPage, currentPage, totalMovies, pagination}) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <Pagination className="pagination-movie" onChange={onClickPage} current={currentPage} total={pageNumbers.length} />
    )

};

Pagination.defaultProps = {
    onClickPage: () => {},
    moviesPerPage: 1,
    currentPage: '',
    totalMovies: null
}

Pagination.propTypes = {
    onClickPage: PropTypes.func,
    moviesPerPage: PropTypes.number,
    currentPage: PropTypes.string,
    totalMovies: PropTypes.number
}

export default PaginationMovie;