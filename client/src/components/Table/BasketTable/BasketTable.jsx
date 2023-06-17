import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import BasketTableRow from '../BasketTableRow/BasketTableRow';
import BasketTableHeader from '../BasketTableHeader/BasketTableHeader';
import { uid } from 'uid';
import './BasketTable.css';
import { Context } from '../../../index';
import OrderForm from "../../OrderForm/OrderForm";
import { toJS } from 'mobx';

const BasketTable = observer(() => {
    const { basketItem } = useContext(Context);
    const [basketItemsState, setBasketItemsState] = useState(basketItem.items);
    const [flag, setFlag] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', tel: '' });

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
    };

    const sum = (arr) => {
        let res = 0;
        for (let i = 0; i < arr.length; i++) {
            res += Number(arr[i].price * arr[i].count);
        }
        return res;
    };

    const handleSend = (event) => {
        event.preventDefault();
        setFlag(true);
    };

    const handleDone = (e) => {
        e.preventDefault()
        const { name, email, tel } = e.currentTarget;
        setFormData({ name: name.value, email: email.value, tel: tel.value });
        // сохранить и вызвать функцию сборки нужой инфы и отправить на сервер
        const combinedData = {
            contacts: formData,
           items: Object.entries(toJS(basketItem.items)).map(([key, value]) =>  ({
                id: value.id,
                size: value.size,
                count: value.count
            })),
        }
        console.log(combinedData);
        // Отправка POST-запроса на сервер
        // fetch('server-address', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(combinedData),
        // })
        // .then((response) => response.json())
        // .then((data) => {
        //     // Обработка ответа от сервера
        //     console.log(data);
        // })
        // .catch((error) => {
        //     // Обработка ошибок
        //     console.error(error);
        // });

        setFlag(false);
    };

    const handleClose = (e) => {
        e.preventDefault()
        setFlag(false);
    };

    return (
        <div className="table__container">
            {flag && <OrderForm handleDone={handleDone} handleClose={handleClose} />}
            <form className="table__custom" onSubmit={handleSend}>
                <div className="rows__container">
                    <BasketTableHeader />

                    {basketItem.items.length > 0 ?
                        basketItem.items.map((item) => (
                            <BasketTableRow key={uid()} item={item} updateBasket={updateBasket} removeItem={removeItem} />
                        ))
                        :
                        <div className="empty__basket">Корзина пуста</div>
                    }
                </div>
                <div className="sum">
                    Сумма: {sum(basketItem.items)} руб
                </div>
                <div className="btn__container">
                    {basketItem.items.length > 0 ?
                        <input
                            className="done__button"
                            type="submit"
                            value="ОФОРМИТЬ ЗАКАЗ"
                        />
                        :
                        <input
                            className="done__button"
                            type="submit"
                            value="ОФОРМИТЬ ЗАКАЗ"
                            disabled
                        />
                    }
                </div>
            </form>
        </div>
    );
});

export default BasketTable;
