import React from 'react';
import { Link } from 'react-router-dom';
import "./Menu.css";
import { uid } from 'uid';

const Menu = ({ brands }) => {

    return (
        <div className="dropdown__menu">
            {brands.map((brand) => (
                <Link key={uid()} to={`/sneakers?brand=${brand.split(' ').join('_')}`} className="menu__links">{brand}</Link>
            ))}
        </div>
    );
};

export default Menu;