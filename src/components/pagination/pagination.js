import React from "react";
import { Pagination } from "antd";

import './pagination.css';

const PaginationMovie = ({onClickPage, moviesPerPage, currentPage, totalMovies, totalPages}) => {

    // const pageNumbers = [];
    // for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    //     pageNumbers.push(i)
    // }
    // console.log(pageNumbers.length)
    const res1 = Math.ceil(totalMovies/totalPages)
    console.log(totalMovies, totalPages)
    return (
        <Pagination className="pagination-movie" onChange={onClickPage} current={currentPage} total={res1}/>
    )
};

export default PaginationMovie;