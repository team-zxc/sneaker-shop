import React, { useEffect, useState, useContext } from 'react';
import img from '../../assets/test.webp';
import { uid } from 'uid';
import './ItemPage.css';
import { Context } from '../../index';
import { useParams } from 'react-router-dom';
import items from '../../items';
// import baskets from '../../baskets';
import { Spinner } from 'react-bootstrap';

const ItemPage = () => {
    const { basket } = useContext(Context);
    const [sneaker, setSneaker] = useState(null);
    const { id } = useParams();
    const [sz, setSz] = useState(null);

    // useEffect(() => {
    //     fetchOneItem(id).then(data => setSneaker(data))
    // }, [id])

    // Раскомментировать код выше и заменить
    useEffect(() => {
        const curSneaker = items.find((item) => item.id === id);
        setSneaker(curSneaker);
    }, [id]);

    // useEffect(() => {
    //     fetchBasketItems().then(data => basket.setItems(data))
    //     basket.setItems(baskets);
    // }, [basket]);

    if (!sneaker) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    };

    const handleClick = (event) => {
        setSz(event.target.value);
    };

    const handleHi = (event) => {
        alert('Товар размером ' + sz + ' добавлен в корзину!');
        event.preventDefault();
        basket.addItem({
            id: sneaker.id,
            image: sneaker.image,
            brand: sneaker.brand,
            model: sneaker.model,
            type: sneaker.type,
            name: sneaker.name,
            price: sneaker.sizes.find((i) => i.size === sz).amount,
            size: sz,
            count: 1,
        });
        // Добавлять в localStorage, и заполнять basket этими данными
    };

    return (
        <div className="item__main-container">
            <div className="item__images">
                <img className="item__img" src={img} alt="" />
            </div>
            <div className="item__info">
                <h1 className="item__info-title">
                    {sneaker.category} {sneaker.brand} {sneaker.model}{' '}
                    {sneaker.type} {sneaker.name}
                </h1>
                <h2 className="item__info-colors">
                    {sneaker.colors.join('/')}
                </h2>
                <h3 className="item__info-article">
                    Артикул: {sneaker.article}
                </h3>
                <div className="item__info-price">{sneaker.price}</div>
                <div className="item__size-block">
                    <div className="item__size-block-title">
                        <div className="item__size-block-title-text">
                            Выберите размер:
                        </div>
                        <ul className="item__size-block-title-list">
                            <li
                                key={uid()}
                                className="item__size-block-title-item active-item"
                            >
                                eu
                            </li>
                            <li
                                key={uid()}
                                className="item__size-block-title-item"
                            >
                                us
                            </li>
                            <li
                                key={uid()}
                                className="item__size-block-title-item"
                            >
                                см
                            </li>
                        </ul>
                    </div>
                    <form onSubmit={handleHi}>
                        <div className="item__size-blocks-container">
                            <ul className="item__size-blocks-list">
                                {sneaker.sizes.map((size) => (
                                    <li
                                        key={uid()}
                                        className="item__size-blocks-item"
                                        value={size.size}
                                        onClick={handleClick}
                                    >
                                        {size.size}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="item__size-buttons-container">
                            <input
                                className="item__size-buttons-add-button"
                                type="submit"
                                value="Добавить в корзину"
                            />
                            {/* <input className="item__size-buttons-buy-button" type="submit" value="Купить сейчас" /> */}
                        </div>
                    </form>
                </div>
                <div>{sneaker.description}</div>
            </div>
        </div>
    );
};

export default ItemPage;
