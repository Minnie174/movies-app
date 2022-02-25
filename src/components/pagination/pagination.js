import React from "react";
import { Pagination } from "antd";

import './pagination.css';

const PaginationMovie = () => {
    return (
        <Pagination className="pagination-movie" size="small" total={5}/>
    )
};

export default PaginationMovie;