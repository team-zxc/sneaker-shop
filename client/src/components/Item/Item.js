import React from 'react';
import './Item.css';
import img from '../../assets/test.webp';
import {Link} from "react-router-dom";

const Item = ({ item }) => {
  return (
    <div className="item_container">
        <Link to={`/sneaker/${item.id}`} className="item_link">
            <img className="item_image" src={img} alt={item.id} />
            <div className="item_description">
                <h3 className="item_title">{item.title}</h3>
                <div className="item_price">от {item.price}р.</div>
            </div>
        </Link>
    </div>
  );
};

export default Item;