import React from 'react';
import './BasketTableCellName.css';
import { Link } from 'react-router-dom';

const BasketTableCellName = ({ cell }) => {
    return (
        <div className='table__cell--name'>
            <Link to={`/sneaker/${cell.id}`} className="item__link--name">
                <div className="cell__title">
                    {cell.model} {cell.type} {cell.name}
                </div>
            </Link>
            <div className="cell__brand">
                {cell.brand}
            </div>
            <div className="cell__size">
                Размер - EU {cell.size}
            </div>
        </div>
    );
};

export default BasketTableCellName;
