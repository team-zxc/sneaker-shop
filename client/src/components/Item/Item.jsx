import React from 'react';
import './Item.css';
// import img from '../../assets/test.webp';
import { Link } from 'react-router-dom';

const Item = ({ item }) => {
    const sizes = item.sizes.map((size) => size.amount);
    const minAmount = Math.min(...sizes);

    return (
        <li className="item__container">
            <Link to={`/sneakers/${item.id}`} className="item__link">
                <img className="item__image" src={item.images} alt={item.model} />
                <div className="items__description">
                    <h3 className="item__title">
                        {item.brand} {item.model} {item.type} {item.name}
                    </h3>
                    <div className="item__price">от {minAmount} руб</div>
                </div>
            </Link>
        </li>
    );
};

export default Item;
