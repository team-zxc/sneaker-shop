import React from 'react';
import './BasketTableRow.css';
import BasketTableCellImage from "..//BasketTableCellImage/BasketTableCellImage";
import BasketTableCellName from "../BasketTableCellName/BasketTableCellName";
import BasketTableCellCount from "../BasketTableCellCount/BasketTableCellCount";
import BasketTableCellPrice from "../BasketTableCellPrice/BasketTableCellPrice";
import BasketTableCellRemove from "../BasketTableCellRemove/BasketTableCellRemove";
import { uid } from 'uid';

const BasketTableRow = ({ item, updateBasket, removeItem }) => {
    return (
        <div className='table__row'>
            <BasketTableCellImage key={uid()} data={item} />
            <BasketTableCellName key={uid()} data={item} />
            <BasketTableCellCount key={uid()} data={item} updateBasket={updateBasket} />
            <BasketTableCellPrice key={uid()} data={item} />
            <BasketTableCellRemove key={uid()} data={item} removeItem={removeItem} />
        </div>
    );
};

export default BasketTableRow;
