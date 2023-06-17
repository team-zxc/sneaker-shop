import React, {useState, useRef, useEffect, useContext} from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Menu from "../Menu/Menu";
import { observer } from 'mobx-react-lite';
import { useOnHoverOutside } from "../../hooks/useOnHoverOutside";
// import brandsMy from "../../brands";
import { Context } from '../../index';
import { autorun } from 'mobx';
import {fetchBrands} from "../../http/brandApi";


const Header = observer(() => {
    const [brands, setBrands] = useState(null);
    const { basketItem } = useContext(Context);
    const [counter, setCounter] = useState(basketItem.items.length)

    useEffect(() => {
        fetchBrands().then(data => setBrands(data))
        // setBrands(brandsMy);
    }, []);

    useEffect(() => {
        // Обновление счетчика при изменении basketItem
        const disposer = autorun(() => {
            setCounter(basketItem.items.length);
        });
        return () => disposer();
    }, [basketItem]);

    const dropdownRef = useRef(null);
    const [isMenuDropDownOpen, setMenuDropDownOpen] = useState(false);

    // Function to close dropdown
    const closeHoverMenu = () => {
        setMenuDropDownOpen(false);
    };

    useOnHoverOutside(dropdownRef, closeHoverMenu);

    const handleSearch = (e) => {
        e.preventDefault()
        alert("Функционал еще не реализован!");
    };

    return (
        <div className="header__container">
            <div className="header__content">
                <div className="header__left">
                    <div className="header__search">
                        <form className="search__form">
                            <input type="text" placeholder="Поиск" />
                            <button onClick={handleSearch} type="submit"></button>
                        </form>
                    </div>
                </div>
                <div className="header__middle">
                    <div className="header__dropdown h__middle" ref={dropdownRef}>
                        <button className="btn__dropdown" onMouseOver={() => setMenuDropDownOpen(true)}>Бренды</button>
                        {isMenuDropDownOpen && brands && <Menu brands={brands} />}
                    </div>
                    <Link to="/" className="header__logo h__middle">Lookout</Link>
                    <Link to="/contacts" className="header__contacts h__middle">Контакты</Link>
                </div>
                <div className="header__right">
                    <Link to="/basket" className="header__basket">
                        <div className="basket__counter">{counter}</div>
                    </Link>
                </div>
            </div>
        </div>
    );
});

export default Header;
