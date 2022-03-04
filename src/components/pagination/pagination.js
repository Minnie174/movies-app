import React from "react";
import { Pagination } from "antd";

import './pagination.css';

const PaginationMovie = ({onClickPage, moviesPerPage, currentPage, totalMovies, totalResults}) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
        pageNumbers.push(i)
    }
    console.log(pageNumbers.length)

    return (
        <Pagination className="pagination-movie" onChange={onClickPage} current={currentPage} total={pageNumbers.length}/>
    )
};

export default PaginationMovie;