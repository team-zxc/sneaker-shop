import React from 'react';
import './BasketTableCellRemove.css';

const BasketTableCellRemove = ({ data, removeItem }) => {
    return (
        <div className='table__cell--remove'>
          <span onClick={() => removeItem(data)} className="delete__btn"></span>
        </div>
    );
};

export default BasketTableCellRemove;
