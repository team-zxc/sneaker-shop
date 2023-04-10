import React from 'react';
import './BasketTableCellCount.css';

const BasketTableCellCount = ({ data, updateBasket }) => {
    const decrement = () => {
        const newCount = data.count - 1;
        updateBasket(data.id, data.size, newCount);
    }
    const increment = () => {
        const newCount = data.count + 1;
        updateBasket(data.id, data.size,  newCount);
    }
    return (
        <div className='table__cell--count'>
            <div className="decrement">
                {data.count === 1 ?
                    <input
                        className="decrement__button"
                        type="button"
                        value="-"
                        onClick={decrement}
                        disabled
                    />
                    :
                    <input
                        className="decrement__button"
                        type="button"
                        value="-"
                        onClick={decrement}
                    />
                }
            </div>
            <div className="counter">
                {data.count}
            </div>
            <div className="increment">
                <input
                    className="increment__button"
                    type="button"
                    value="+"
                    onClick={increment}
                />
            </div>
        </div>
    );
};

export default BasketTableCellCount;