import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer_container">
            <ul className="footer_content">
                <li className="footer_left"></li>
                <li className="footer_middle">
                    <div className="footer_middle-title">
                        КОНТАКТЫ
                    </div>
                    <div className="footer_middle-links">
                        <a href="tel:+79035101495" className="footer_link-number">+7 (903) 510-14-95</a>
                        <a href="https://t.me/+79035101495" className="footer_link-telegram">@vinatian00</a>
                        <a href="mailto:vp.vlad00@mail.ru" className="footer_link-email">vp.vlad00@mail.ru</a>
                    </div>
                </li>
                <li className="footer_right">
                    <a href="https://vk.com/vladislav_petrov1996" className="footer_link-icon">
                        <span className="footer-social-icon footer-social-icon-vk"></span>
                    </a>
                    <a href="" className="footer_link-icon">
                        <span className="footer-social-icon footer-social-icon-instagram"></span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Footer;