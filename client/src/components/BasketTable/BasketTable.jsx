import React, { useContext } from 'react';
import BasketTableRow from '../BasketTableRow/BasketTableRow';
import BasketTableHeader from '../BasketTableHeader/BasketTableHeader';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { uid } from 'uid';
import './BasketTable.css';

const BasketTable = observer(() => {
    const { basket } = useContext(Context);

    return (
        <div className="table">
            <BasketTableHeader />
            {basket.items.map((item) => (
                <BasketTableRow key={uid()} item={item} />
            ))}
        </div>
    );
});

export default BasketTable;
