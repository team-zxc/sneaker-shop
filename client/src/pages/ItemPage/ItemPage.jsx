import React, { useEffect, useState, useContext } from 'react';
import img from '../../assets/test.webp';
import { uid } from 'uid';
import './ItemPage.css';
import { useParams } from 'react-router-dom';
import items from '../../items';
import { Spinner } from 'react-bootstrap';
import ColorSizeBlock from '../../components/ColorSizeBlock/ColorSizeBlock';
import { Context } from '../../index';

const ItemPage = () => {
    const { basketItem } = useContext(Context);
    const [sneaker, setSneaker] = useState(null);
    const { id } = useParams();
    const [blocks, setBlocks] = useState([]);
    useEffect(() => {
        const curSneaker = items.find((item) => item.id === id);
        setSneaker(curSneaker);
        setBlocks(curSneaker.sizes.map((size) => ({id: uid(), color: 'FFFFFF', size: size })));
    }, [id]);
    
    const [sz, setSz] = useState(null);
    const [bsk, setBsk] = useState(
        JSON.parse(localStorage.getItem('basket')) || []
    )

    const handleBlockClick = (id) => {
        const newBlocks = blocks.map((block) => {
            if (block.id === id) {
                setSz(block.size.size);
                return { ...block, color: '#D9D9D9' };
            } else {
                return { ...block, color: '#FFFFFF' };
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
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    };

    const handleHi = (event) => {
        event.preventDefault();
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
            alert('Товар размером ' + sz + ' добавлен в корзину!');
            basketItem.addItem(newBskItem);
        } else {
            alert('Этот товар уже в корзине!');
        }
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
                                {blocks.map((block) => (
                                    <ColorSizeBlock
                                        key={block.id}
                                        color={block.color}
                                        handleClick={() => handleBlockClick(block.id)}
                                        size={block.size}
                                    />
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
                <div className="item__description">
                    {sneaker.description}
                </div>
            </div>
        </div>
    );
};

export default ItemPage;
