import React from 'react';
import './BasketTableCellCount.css';

const BasketTableCellCount = ({ cell }) => {
    return (
        <div className='table__cell--count'>
            <div className="decrement">
                -
            </div>
            <div className="counter">
                {cell.count}
            </div>
            <div className="increment">
                +
            </div>
        </div>
    );
};

export default BasketTableCellCount;