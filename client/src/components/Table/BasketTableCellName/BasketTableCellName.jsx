import React from 'react';
import './BasketTableCellName.css';
import { Link } from 'react-router-dom';

const BasketTableCellName = ({ data }) => {
    return (
        <div className='table__cell--name'>
            <Link to={`/sneakers/${data.id}`} className="item__link--name">
                {data.model} {data.type} {data.name}
            </Link>
            <div className="cell__brand">
                {data.brand}
            </div>
            <div className="cell__size">
                Размер - EU {data.size}
            </div>
        </div>
    );
};

export default BasketTableCellName;
