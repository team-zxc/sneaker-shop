import React from 'react';
import './BasketTableCellPrice.css';

const BasketTableCellPrice = ({ data }) => {
    return (
        <div className='table__cell--price'>
            {data.price * data.count}
        </div>
    );
};

export default BasketTableCellPrice;
