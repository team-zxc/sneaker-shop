import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import './MainPage.css';
import { uid } from 'uid';
import ItemList from '../../components/ItemList/ItemList';
import models from '../../models';
import items from '../../items';

const MainPage = observer(() => {
    const { item } = useContext(Context);
    
    useEffect(() => {
        // fetchItems().then(data => item.setItems(data))
        // fetchModels().then(data => item.setModels(data))
        item.setItems(items);
        item.setModels(models);
    }, [item]);

    return (
        <ul className="main__container">
            {models.map((model) => (
                <li key={uid()} className="model__container">
                    <h2 className="items__model">{model}</h2>
                    <ItemList key={uid()} model={model} />
                </li>
            ))}
        </ul>
    );
});

export default MainPage;
