import React from "react";
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

export default Search;