import React, { useEffect, useState, useContext } from 'react';
// import img from '../../assets/test.webp';
import { uid } from 'uid';
import './ItemPage.css';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import ColorSizeBlock from '../../components/ColorSizeBlock/ColorSizeBlock';
import Notification from "../../components/Notification/Notification";

import { Context } from '../../index';
// import items from '../../items';
import {fetchOneItem} from "../../http/itemApi";

const ItemPage = () => {
    const [notificationTimer, setNotificationTimer] = useState(null);
    const { basketItem } = useContext(Context);
    const [sneaker, setSneaker] = useState(null);
    const { id } = useParams();
    const [blocks, setBlocks] = useState([]);
    const [notificationActive, setNotificationActive] = useState(false);
    const [notificationText, setNotificationText] = useState('');
    const [curAmount, setCurAmount] = useState(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const clearNotificationTimer = () => {
        clearTimeout(notificationTimer);
    };

    useEffect(() => {
        fetchOneItem(id).then(data => {
            setSneaker(data);
            const sizes = data.sizes.map((size) => size.amount);
            setCurAmount(Math.min(...sizes));
            setBlocks(data.sizes.map((size) => ({id: uid(), color: '#000000', backgroundColor: '#FFFFFF', size: size })));
        });
        // const curSneaker = items.find((item) => item.id === id);
        // setSneaker(curSneaker);
    }, [id]);
    
    const [sz, setSz] = useState(null);
    const [bsk, setBsk] = useState(
        JSON.parse(localStorage.getItem('basket')) || []
    );

    const handleCloseNotification = (e) => {
        e.preventDefault();
        clearNotificationTimer();
        setNotificationActive(false);
        setIsAddingToCart(false);
    }

    const handleBlockClick = (id) => {
        const newBlocks = blocks.map((block) => {
            if (block.id === id) {
                setCurAmount(block.size.amount);
                setSz(block.size.size);
                return { ...block, color: '#FFFFFF', backgroundColor: '#000000' };
            } else {
                return { ...block, color: '#000000', backgroundColor: '#FFFFFF' };
            }
        });
        setBlocks(newBlocks);
    }

    const get_first_image = (data) => {
        return data[0]
    }

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(bsk))
    }, [bsk]);

    if (!sneaker) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Загрузка...</span>
            </Spinner>
        );
    }

    const handleAdd = (event) => {
        event.preventDefault();
        if(sz !== null && !isAddingToCart) {
            setIsAddingToCart(true);

            if(!Boolean(bsk.find((b) => b.id === sneaker.id && b.size === sz))) {
                const newBskItem = {
                    id: sneaker.id,
                    image: get_first_image(sneaker.images),
                    brand: sneaker.brand,
                    model: sneaker.model,
                    type: sneaker.type,
                    name: sneaker.name,
                    price: sneaker.sizes.find((i) => i.size === sz).amount,
                    size: sz,
                    count: 1,
                };
                setBsk([...bsk, newBskItem]);
                setNotificationText(`Товар с размером ${sz} добавлен в корзину!`);
                setNotificationActive(true);
                basketItem.addItem(newBskItem);

                // Запускаем таймер для автоматического закрытия уведомления
                const timer = setTimeout(() => {
                    setNotificationActive(false);
                    setIsAddingToCart(false); // Сбрасываем состояние isAddingToCart
                }, 3000);
                setNotificationTimer(timer);
            } else {
                setNotificationText('Такой товар уже в корзине!');
                setNotificationActive(true);

                // Запускаем таймер для автоматического закрытия уведомления
                const timer = setTimeout(() => {
                    setNotificationActive(false);
                    setIsAddingToCart(false); // Сбрасываем состояние isAddingToCart
                }, 3000);
                setNotificationTimer(timer);
            }
        }
    };

    const handleGrid = (e) => {
        e.preventDefault();
        alert("Функционал еще не реализован!");
    }

    return (
        <div className="item__main-container">
            {notificationActive && (
                <Notification info={notificationText} handleCloseNotification={handleCloseNotification} showActive={notificationActive} />
            )}
            <div className="item__images">
                <div className="item__images-main">
                    <img className="item__img main__image" src={process.env.REACT_APP_SERVER_ADDRESS + '/' + get_first_image(sneaker.images)} alt={sneaker.model} />
                </div>
                <div className="item__images-others">
                    {sneaker.images.slice(1).map((image) => (
                        <img key={uid()} className="item__img" src={process.env.REACT_APP_SERVER_ADDRESS + '/' + image} alt={sneaker.model} />
                    ))}
                </div>
            </div>
            <div className="item__info">
                <h1 className="item__info-title">
                    {sneaker.brand} {sneaker.model} {sneaker.name}
                </h1>
                <h2 className="item__info-colors">
                    {sneaker.colors.join('/').toLowerCase()}
                </h2>
                <h3 className="item__info-article">
                    Артикул: {sneaker.vendor_code}
                </h3>
                <div className="item__info-price">{curAmount} руб</div>
                <div className="item__size-block">
                    <div className="item__size-block-title">
                        <div className="item__size-block-left-title">
                            <div className="item__size-block-title-text">
                                Выберите размер:
                            </div>
                            <ul className="item__size-block-title-list">
                                <li
                                    key={uid()}
                                    className="item__size-block-title-item"
                                >
                                    eu
                                </li>
                            </ul>
                        </div>
                        <div className="item__size-block-right-title">
                            <div className="item__size-block-grid" onClick={handleGrid}>Таблица размеров</div>
                        </div>
                    </div>
                    <form onSubmit={handleAdd}>
                        <div className="item__size-blocks-container">
                            <ul className="item__size-blocks-list">
                                {blocks.map((block) => (
                                    <ColorSizeBlock
                                        key={block.id}
                                        color={block.color}
                                        backcolor={block.backgroundColor}
                                        handleClick={() => handleBlockClick(block.id)}
                                        size={block.size}
                                    />
                                ))}
                            </ul>
                        </div>
                        <div className="item__size-buttons-container">
                            {sz !== null ?
                                <input
                                    className="item__size-buttons-add-button"
                                    type="submit"
                                    value="Добавить в корзину"
                                />
                                :
                                <input
                                    className="item__size-buttons-add-button"
                                    type="submit"
                                    value="Добавить в корзину"
                                    disabled
                                />
                            }
                        </div>
                    </form>
                </div>
                <div className="item__description">
                    {sneaker.description}
                </div>
            </div>
        </div>
    );
};

export default ItemPage;
