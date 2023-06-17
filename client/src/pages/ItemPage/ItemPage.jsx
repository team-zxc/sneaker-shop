import React, { useEffect, useState, useContext } from 'react';
import img from '../../assets/test.webp';
import { uid } from 'uid';
import './ItemPage.css';
import { useParams } from 'react-router-dom';
import items from '../../items';
import { Spinner } from 'react-bootstrap';
import ColorSizeBlock from '../../components/ColorSizeBlock/ColorSizeBlock';
import { Context } from '../../index';
import Notification from "../../components/Notification/Notification";

const ItemPage = () => {
    const [notificationTimer, setNotificationTimer] = useState(null);
    const clearNotificationTimer = () => {
        clearTimeout(notificationTimer);
    };
    const { basketItem } = useContext(Context);
    const [sneaker, setSneaker] = useState(null);
    const { id } = useParams();
    const [blocks, setBlocks] = useState([]);
    const [notificationActive, setNotificationActive] = useState(false);
    const [notificationText, setNotificationText] = useState('');
    const [minAmount, setMinAmount] = useState(null);

    useEffect(() => {
        const curSneaker = items.find((item) => item.id === id);
        setSneaker(curSneaker);
        const sizes = curSneaker.sizes.map((size) => size.amount);
        setMinAmount(Math.min(...sizes));
        setBlocks(curSneaker.sizes.map((size) => ({id: uid(), color: '#000000', backgroundColor: '#FFFFFF', size: size })));
    }, [id]);
    
    const [sz, setSz] = useState(null);
    const [bsk, setBsk] = useState(
        JSON.parse(localStorage.getItem('basket')) || []
    );

    const handleCloseNotification = (e) => {
        e.preventDefault();
        clearNotificationTimer();
        setNotificationActive(false);
    }

    const handleBlockClick = (id) => {
        const newBlocks = blocks.map((block) => {
            if (block.id === id) {
                setSz(block.size.size);
                return { ...block, color: '#FFFFFF', backgroundColor: '#000000' };
            } else {
                return { ...block, color: '#000000', backgroundColor: '#FFFFFF' };
            }
        });
        setBlocks(newBlocks);
    }

    // useEffect(() => {
    //     fetchOneItem(id).then(data => setSneaker(data))
    // }, [id])

    // Раскомментировать код выше и заменить

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
        if(sz !== null) {
            if(!Boolean(bsk.find((b) => b.id === sneaker.id && b.size === sz))) {
                const newBskItem = {
                    id: sneaker.id,
                    image: sneaker.image,
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
                }, 3000);
                setNotificationTimer(timer);
            } else {
                setNotificationText('Такой товар уже в корзине!');
                setNotificationActive(true);
                // Запускаем таймер для автоматического закрытия уведомления
                const timer = setTimeout(() => {
                    setNotificationActive(false);
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
                    <img className="item__img main__image" src={img} alt={sneaker.model} />
                </div>
                <div className="item__images-others">
                    <img className="item__img" src={img} alt={sneaker.model} />
                    <img className="item__img" src={img} alt={sneaker.model} />
                    <img className="item__img" src={img} alt={sneaker.model} />
                    <img className="item__img" src={img} alt={sneaker.model} />
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
                    Артикул: {sneaker.article}
                </h3>
                <div className="item__info-price">{minAmount} руб</div>
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
