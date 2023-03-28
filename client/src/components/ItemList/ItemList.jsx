import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { uid } from 'uid';
import Item from '../Item/Item';
import './ItemList.css';

const ItemList = observer(({ model }) => {
    const { item } = useContext(Context);

    return (
        <ul className="items__container">
            {item.items
                .filter((snk) => snk.model === model)
                .map((sneaker) => (
                    <Item key={uid()} item={sneaker} />
                ))
            }
        </ul>
    );
});

export default ItemList;
