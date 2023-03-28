import React from 'react';
import './BasketTableHeader.css';

const BasketTableHeader = () => {
    return (
    <div className="table__row--header">
        <div className="table__cell--header">ТОВАР</div>
        <div className="table__cell--header"></div>
        <div className="table__cell--header" style={{textAlign: 'center'}}>КОЛИЧЕСТВО</div>
        <div className="table__cell--header" style={{textAlign: 'center'}}>СТОИМОСТЬ</div>
    </div>
    );
};

export default BasketTableHeader;
