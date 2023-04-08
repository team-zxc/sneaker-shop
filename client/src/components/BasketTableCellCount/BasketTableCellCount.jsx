import React, { useState, useEffect } from 'react';
import './BasketTableCellCount.css';

const BasketTableCellCount = ({ cell }) => {
    const [counter, setCounter] = useState(cell.count)
    const [bsk, setBsk] = useState(() => {
        const storedBasket = localStorage.getItem('basket');
        return storedBasket !== null ? JSON.parse(storedBasket) : [];
    });
    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(bsk));
    }, [bsk]);
    const removeItem = (itemId, size) => {
        setBsk((bsk) => {
            const updatedBasket = bsk.filter((item) => item.id !== itemId || item.size !== size);
            localStorage.setItem('basket', JSON.stringify(updatedBasket));
            return updatedBasket;
        });
    };
    const decrement = () => {
        setCounter((prevCounter) => {
            const newCounter = prevCounter - 1;
            if (newCounter === 0) {
                removeItem(cell.id, cell.size);
            }
            return newCounter > 0 ? newCounter : 0;
        });
        setBsk(bsk => {
            const itemIndex = bsk.findIndex(item => item.id === cell.id && item.size === cell.size);
            const updatedItem = {...bsk[itemIndex], count: bsk[itemIndex].count > 0 ? bsk[itemIndex].count - 1 : 0};
            const updatedBasket = [...bsk.slice(0, itemIndex), updatedItem, ...bsk.slice(itemIndex + 1)];
            localStorage.setItem('basket', JSON.stringify(updatedBasket));
            return updatedBasket;
        });
    }
    const increment = () => {
        setCounter(counter + 1);
        setBsk(bsk => {
            const itemIndex = bsk.findIndex(item => item.id === cell.id && item.size === cell.size);
            const updatedItem = {...bsk[itemIndex], count: bsk[itemIndex].count + 1};
            const updatedBasket = [...bsk.slice(0, itemIndex), updatedItem, ...bsk.slice(itemIndex + 1)];
            localStorage.setItem('basket', JSON.stringify(updatedBasket));
            return updatedBasket;
        });
    }
    return (
        <div className='table__cell--count'>
            <div className="decrement">
                <input
                    className="decrement__button"
                    type="button"
                    value="-"
                    onClick={decrement}
                />
            </div>
            <div className="counter">
                {counter}
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