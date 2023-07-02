import React, {useContext, useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import './FilteredPage.css';
import { uid } from 'uid';
import Spinner from 'react-bootstrap/Spinner';
import ItemList from '../../components/ItemList/ItemList';
// import items_test from '../../items';
// import brands_file from '../../brands';
import { useSearchParams } from "react-router-dom";
import {fetchItems} from "../../http/itemApi";
//import {fetchBrands} from "../../http/brandApi";


const FilteredPage = observer(() => {
    //const [brands, setBrands] = useState([]);
    const { item } = useContext(Context);
    const [searchParams] = useSearchParams();
    const [par, setPar] = useState("");
    const [loading, setLoading] = useState(true);
    // Serialization
    const customize_items = (data) => {
        const items_custom = {};
        data.map((i) => {
            const mod = i.model;
            if (!items_custom[mod]) {
                items_custom[mod] = [];
            }
            items_custom[mod].push(i);
            return i.model;
        })
        return items_custom;
    };

    
    useEffect(() => {
        //fetchBrands().then(data => setBrands(data));
        // setBrands(brands_file);
        fetchItems(searchParams.get("brand")).then(data => {
            item.setItems(customize_items(data));
            setLoading(false); // Установка состояния загрузки в false после загрузки данных
        });
        const param = searchParams.get("brand") != null ? searchParams.get("brand").split("_").join(" ") : undefined;
        if (param) {
            setPar(param);
        } else {
            setPar("Все пары");
        }
    }, [searchParams]);

    return (
        <div className="filtered__container">
            <div className="filtered__title">{par}</div>
            <div className="filtered__model-title">Модели:</div>
            {loading ? ( // Показывать спиннер, пока данные загружаются
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden"></span>
                    </Spinner>
                ) : (
                    <ul className="models__container">
                        {Object.keys(item.items).map((model) => (
                            <li key={uid()} className="model__container">
                                <h2 className="items__model">{model}</h2>
                                <ItemList key={uid()} model={model} />
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    );
});

export default FilteredPage;
