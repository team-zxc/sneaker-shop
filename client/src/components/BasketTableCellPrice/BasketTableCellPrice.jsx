import React from 'react';
import './BasketTableCellPrice.css';

const BasketTableCellPrice = ({ cell }) => {
    return (
        <div className='table__cell--price'>
            {cell.price}
        </div>
    );
};

export default BasketTableCellPrice;
