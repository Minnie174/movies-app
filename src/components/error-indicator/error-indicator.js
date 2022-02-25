import React from "react";
import { Alert } from "antd";
import './error-indicator.css';

const ErrorIndicator = () => {
    return (
        <div>
            <Alert message="Something went wrong" type="error" closable/>
        </div>
    )
};

export default ErrorIndicator;