import React from "react";
import PropTypes from 'prop-types';
import {debounce} from "lodash";
import {Input} from "antd";

import './search.css';

const Search = ({onMovie}) => {
    return (
        <div>
            <Input type="text" className="input" placeholder="Type any movie" onChange={debounce(onMovie, 1000)}/>
        </div>
    )
};

Search.defaultProps = {
    onMovie: () => {}
}

Search.propTypes = {
    onMovie: PropTypes.func
}

export default Search;