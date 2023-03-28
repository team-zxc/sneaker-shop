import React from 'react';
import './BasketTableCellImage.css';
import img from '../../assets/test.webp';

const BasketTableCellImage = ({ cell }) => {
    return (
        <div className="table__cell--image">
            <img className="table__image" src={img} alt="" />
        </div>
    )
};

export default BasketTableCellImage;
