import React, { useState, useEffect, useContext } from 'react';
import BasketTableRow from '../BasketTableRow/BasketTableRow';
import BasketTableHeader from '../BasketTableHeader/BasketTableHeader';
import { uid } from 'uid';
import './BasketTable.css';
// import { Context } from '../../index';

const BasketTable = () => {
    // const { basketItem } = useContext(Context);
    const [bsk] = useState(() => {
        const storedBasket = localStorage.getItem('basket');
        return storedBasket !== null ? JSON.parse(storedBasket) : [];
    });

    const sum = (arr) => {
        let res = 0;
        for (let i = 0; i < arr.length; i++) {
            res += Number(arr[i].price * arr[i].count);
        }
        return res;
    }

    const handleSend = (event) => {
        event.preventDefault();
        alert("Информация о заказе поступит на почту!");
    }

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(bsk))
    }, [bsk]);

    return (
        <form className="table" onSubmit={handleSend}>
            <BasketTableHeader />
            {bsk.length > 0 ?
                bsk.map((item) => (
                    <BasketTableRow key={uid()} item={item} />
                ))
                :
                <div className="empty__basket">Корзина пуста</div>
            }
            <div className="sum">
                Итого: {sum(bsk)}
            </div>
            <div className="btn__container">
                {bsk.length > 0 ?
                    <input
                        className="done__button"
                        type="submit"
                        value="Оформить заказ"
                    />
                    :
                    <input
                        className="done__button-disabled"
                        type="submit"
                        value="Оформить заказ"
                        disabled
                    />
                }

            </div>
        </form>
    );
};

export default BasketTable;
