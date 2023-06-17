import React, { useEffect } from 'react';
import "./Notification.css";
const Notification = ( {info, handleCloseNotification, showActive} ) => {

    useEffect(() => {
        if (showActive) {
            const timer = setTimeout(() => {
                handleCloseNotification();
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [showActive, handleCloseNotification]);
    
    return (
        <div className="toast_custom">
            <div className="toast-content_custom">
                <div className="message_custom">
                    <span className="text_custom">{info}</span>
                </div>
            </div>
            <span className="close_custom" onClick={handleCloseNotification}></span>
            <div className="progress"></div>
        </div>
    );
};

export default Notification;