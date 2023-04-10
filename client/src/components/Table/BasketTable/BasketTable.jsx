import React, { useState, useContext } from 'react';
import BasketTableRow from '../BasketTableRow/BasketTableRow';
import BasketTableHeader from '../BasketTableHeader/BasketTableHeader';
import { uid } from 'uid';
import './BasketTable.css';
import { Context } from '../../../index';

const BasketTable = () => {
    const { basketItem } = useContext(Context);
    const [basketItemsState, setBasketItemsState] = useState(basketItem.items);

    const updateBasket = (itemId, size, count) => {
        const updatedBasket = basketItemsState.map((item) => {
        if (item.id === itemId && item.size === size) {
            return { ...item, count };
        }
        return item;
        });
        setBasketItemsState(updatedBasket);
        basketItem.setItems(updatedBasket);
    };

    const removeItem = (item) => {
        const updatedBasket = basketItemsState.filter(i => i.id !== item.id || i.size !== item.size);
        // basketItemsState.map((b) => console.log(b.id))
        // updatedBasket.map((b) => console.log(b.id))
        setBasketItemsState(updatedBasket);
        basketItem.setItems(updatedBasket);
    }

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

    return (
        <form className="table" onSubmit={handleSend}>
            <BasketTableHeader />
            {basketItem.items.length > 0 ?
                basketItem.items.map((item) => (
                    <BasketTableRow key={uid()} item={item} updateBasket={updateBasket} removeItem={removeItem} />
                ))
                :
                <div className="empty__basket">Корзина пуста</div>
            }
            <div className="sum">
                Итого: {sum(basketItem.items)}
            </div>
            <div className="btn__container">
                {basketItem.items.length > 0 ?
                    <input
                        className="done__button"
                        type="submit"
                        value="Оформить заказ"
                    />
                    :
                    <input
                        className="done__button"
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
