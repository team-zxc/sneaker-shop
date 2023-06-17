import React from 'react';
import './BasketTableHeader.css';

const BasketTableHeader = () => {
    return (
    <div className="table__row--header">
        <div className="table__cell--header">ТОВАР</div>
        <div className="table__cell--header">ОПИСАНИЕ</div>
        <div className="table__cell--header">КОЛИЧЕСТВО</div>
        <div className="table__cell--header">СТОИМОСТЬ, руб</div>
        <div className="table__cell--header"></div>
    </div>
    );
};

export default BasketTableHeader;
