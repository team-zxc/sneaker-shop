import React from 'react';
import './BasketPage.css';
import BasketTable from '../../components/BasketTable/BasketTable'

const BasketPage = () => {
    return (
        <div className="basket__main-container">
            <h1 className="basket__title">Корзина</h1>
            <BasketTable />
        </div>
    );
};

export default BasketPage;
