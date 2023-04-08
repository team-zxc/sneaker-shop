import React from 'react';
import './BasketTableRow.css';
import BasketTableCellImage from "../BasketTableCellImage/BasketTableCellImage";
import BasketTableCellName from "../BasketTableCellName/BasketTableCellName";
import BasketTableCellCount from "../BasketTableCellCount/BasketTableCellCount";
import BasketTableCellPrice from "../BasketTableCellPrice/BasketTableCellPrice";
import { uid } from 'uid';

const BasketTableRow = ({ item }) => {
    return (
        <div className='table__row'>
            <BasketTableCellImage key={uid()} cell={item} />
            <BasketTableCellName key={uid()} cell={item} />
            <BasketTableCellCount key={uid()} cell={item} />
            <BasketTableCellPrice key={uid()} cell={item} />
        </div>
    );
};

export default BasketTableRow;
