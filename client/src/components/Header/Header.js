import React from 'react';
import './Header.css';
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <div className="header_container">
        <div className="header_content">
            <div className="header_left">
                <div className="header_search">
                    <form className="search_form">
                        <input type="text" placeholder="Search" />
                        <button type="submit"></button>
                    </form>
                </div>
                <div className="header_filter">
                    Filter
                </div>
            </div>
            <Link to="/" className="header_logo"></Link>
            <Link to="/basket" className="header_basket"></Link>
        </div>
    </div>
  );
};

export default Header;