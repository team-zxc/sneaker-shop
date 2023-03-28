import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header__container">
            <div className="header__content">
                <div className="header__left">
                    <div className="header__search">
                        <form className="search__form">
                            <input type="text" placeholder="Search" />
                            <button type="submit"></button>
                        </form>
                    </div>
                    <div className="header__filter">Filter</div>
                </div>
                <Link to="/" className="header__logo"></Link>
                <Link to="/basket" className="header__basket"></Link>
            </div>
        </div>
    );
};

export default Header;
