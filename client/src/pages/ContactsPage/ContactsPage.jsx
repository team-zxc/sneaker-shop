import React from 'react';

import "./ContactsPage.css";

const ContactsPage = () => {
    return (
        <div className="contacts__container">
            <h1 className="contacts__title">Свяжитесь с нами</h1>
            <div className="contacts__content">
                <div className="contacts__description">
                    При возникновении вопросов обращаться по адресу:
                </div>
                <ul className="links__container">
                    <li className="item__contacts">tel</li>
                    <li className="item__contacts">address</li>
                    <li className="item__contacts">mail</li>
                    <li className="item__contacts">social</li>
                </ul>
            </div>
        </div>
    );
};

export default ContactsPage;