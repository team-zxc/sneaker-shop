import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const ItemList = observer(() => {
    const {item} = useContext(Context)

    return (
        <div>
            
        </div>
    );
});

export default ItemList;