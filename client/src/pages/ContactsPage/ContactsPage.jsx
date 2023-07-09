import React from 'react';

import "./ContactsPage.css";

const ContactsPage = () => {
    return (
        <div className="contacts__container">
            <h1 className="contacts__title">Свяжитесь с нами</h1>
            <div className="contacts__description">
                При возникновении вопросов обращаться по адресу:
            </div>
            <div className="contacts__content">
                <ul className="links__container">
                    <a href='tel:+79035101495' className="item__link-cts">
                        <li className="item__contacts">
                            <span className="item__icon item__icon-phone"></span>
                            <h2 className="item__title-cts">ЗВОНИТЕ СЕГОДНЯ</h2>
                            <div className="item__value">+7 (903) 510 14-95</div>
                        </li>
                    </a>
                    <a href='mailto:vp.vlad00@mail.ru' className="item__link-cts">
                        <li className="item__contacts">
                            <span className="item__icon item__icon-email"></span>
                            <h2 className="item__title-cts">СВЯЖИТЕСЬ С НАМИ ПО ЭЛЕКТРОННОЙ ПОЧТЕ</h2>
                            <div className="item__value">vp.vlad00@mail.ru</div>
                        </li>
                    </a>
                    <a href='https://t.me/+79035101495' className="item__link-cts">
                        <li className="item__contacts">
                            <span className="item__icon item__icon-telegram"></span>
                            <h2 className="item__title-cts">ПИШИТЕ В TELEGRAM</h2>
                            <div className="item__value">@vinatian00</div>
                        </li>
                    </a>
                    <a href='https://vk.com/vladislav_petrov1996' className="item__link-cts">
                        <li className="item__contacts">
                            <span className="item__icon item__icon-vk"></span>
                            <h2 className="item__title-cts">УТОЧНЯЙТЕ В ВКОНТАКТЕ</h2>
                            <div className="item__value">vladislav_petrov1996</div>
                        </li>
                    </a>
                </ul>
            </div>
        </div>
    );
};

export default ContactsPage;