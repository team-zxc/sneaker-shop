import React, {useEffect, useState} from 'react';
import img from '../../assets/test.webp';
import './ItemPage.css';

import { Link, useParams } from "react-router-dom";
import items from "../../items";

const ItemPage = () => {
    const [sneaker, setSneaker] = useState(null)
    const { id } = useParams();

    // useEffect(() => {
    //     fetchOneDevice(id).then(data => setDevice(data))
    // }, [])

    useEffect(() => {
    const curSneaker = items.find(item => item.id === id);
    setSneaker(curSneaker);
    }, []);

    if (!sneaker) return <div>Loading...</div>;

    return (
        <div className="item_main-container">
            {/*<Link to='/'>Back to Main</Link>*/}
            <div className="item_images">
                <img className="item_img" src={img} alt=""/>
            </div>
            <div className="item_info">
                <h1 className="item_info-title">{sneaker.title}</h1>
                <h2 className="item_info-colors">{sneaker.colors}</h2>
                <h3 className="item_info-article">Артикул: {sneaker.article}</h3>
                <div className="item_info-price">{sneaker.price}</div>
                <div className="item_size-block">
                    <div className="item_size-block-title">
                        <div className="item_size-block-title-text">Выберите размер:</div>
                        <ul className="item_size-block-title-list">
                            <li className="item_size-block-title-item active-item">eu</li>
                            <li className="item_size-block-title-item">us</li>
                            <li className="item_size-block-title-item">см</li>
                        </ul>
                    </div>
                    <div className="item_size-blocks_container">
                        <ul className="item_size-blocks_list">
                            <li className="item_size-blocks-item">40</li>
                            <li className="item_size-blocks-item">42</li>
                            <li className="item_size-blocks-item">43</li>
                        </ul>
                    </div>
                    <div className="item_size-buttons-container">
                        <button className="item_size-buttons-add-button">Добавить в корзину</button>
                        <button className="item_size-buttons-buy-button">Купить сейчас</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemPage;