import React from 'react';
import './BasketTableRow.css';
import BasketTableCellImage from "../BasketTableCellImage/BasketTableCellImage";
import BasketTableCellName from "../BasketTableCellName/BasketTableCellName";
import BasketTableCellCount from "../BasketTableCellCount/BasketTableCellCount";
import BasketTableCellPrice from "../BasketTableCellPrice/BasketTableCellPrice";
import { uid } from 'uid';

const BasketTableRow = ({ item }) => {
    const {
        id,
        image,
        model,
        type,
        name,
        brand,
        size,
        count,
        price,
    } = item

    return (
        <div className='table__row'>
            <BasketTableCellImage key={uid()} cell={{image}} />
            <BasketTableCellName key={uid()} cell={{id, model, type, name, brand, size}} />
            <BasketTableCellCount key={uid()} cell={{count}} />
            <BasketTableCellPrice key={uid()} cell={{price}} />
        </div>
    );
};

export default BasketTableRow;
