import React from 'react';
import './Item.css';
import img from '../../assets/test.webp';
import { Link } from 'react-router-dom';

const Item = ({ item }) => {
    return (
        <li className="item__container">
            <Link to={`/sneaker/${item.id}`} className="item__link">
                <img className="item__image" src={img} alt={item.id} />
                <div className="item__description">
                    <h3 className="item__title">
                        {item.brand} {item.model} {item.type} {item.name}
                    </h3>
                    <div className="item__price">от {item.price}р.</div>
                </div>
            </Link>
        </li>
    );
};

export default Item;
