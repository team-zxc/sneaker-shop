import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer__container">
            <ul className="footer__content">
                <li className="footer__left"></li>
                <li className="footer__middle">
                    <div className="footer__middle-title">КОНТАКТЫ</div>
                    <div className="footer__middle-links">
                        <a
                            href="tel:+79035101495"
                            className="footer__link-number"
                        >
                            +7 (903) 510-14-95
                        </a>
                        <a
                            href="https://t.me/+79035101495"
                            className="footer__link-telegram"
                        >
                            @vinatian00
                        </a>
                        <a
                            href="mailto:vp.vlad00@mail.ru"
                            className="footer__link-email"
                        >
                            vp.vlad00@mail.ru
                        </a>
                    </div>
                </li>
                <li className="footer__right">
                    <a
                        href="https://vk.com/vladislav_petrov1996"
                        className="footer__link-icon"
                    >
                        <span className="footer-social-icon footer-social-icon-vk"></span>
                    </a>
                    <a
                        href="https://www.instagram.com/pcabl"
                        className="footer__link-icon"
                    >
                        <span className="footer-social-icon footer-social-icon-instagram"></span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Footer;
