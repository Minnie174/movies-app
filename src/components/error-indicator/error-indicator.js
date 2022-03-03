import React from "react";
import { Alert } from "antd";
import './error-indicator.css';

const ErrorIndicator = () => {
    const onClose = (e) => {
        console.log(e, 'closed')
    }
    return (
        <div className="error">
            <Alert message="Something went wrong" type="error" closable onClose={onClose}/>
        </div>
    )
};

export default ErrorIndicator;