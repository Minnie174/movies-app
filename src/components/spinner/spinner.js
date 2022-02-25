import React from "react";
import { Spin } from "antd";

import './spinner.css';

const Spinner = () => {
    return (
        <div className="spinner">
            <Spin size="middle"/>
        </div>
    )
}

export default Spinner;