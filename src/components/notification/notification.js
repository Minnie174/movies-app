import React from "react";
import { Alert } from "antd";
import './notification.css';

const Notification = () => {
    return (
        <div className="notification">
            <Alert message="There is no such movie" type="info" showIcon/>
        </div>
    )
}

export default Notification;