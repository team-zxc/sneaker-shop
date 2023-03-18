import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import './MainPage.css';
import Item from "../../components/Item/Item";

import items from "../../items";

const MainPage = observer(() => {
    // const {item} = useContext(Context)
    //
    // useEffect(() => {
    //     fetchTypes().then(data => item.setTypes(data))
    //     fetchBrands().then(data => item.setBrands(data))
    //     fetchDevices(null, null, 1, 7).then(data => {
    //         item.setDevices(data.rows)
    //         item.setTotalCount(data.count)
    //     })
    // }, [])
    //
    // useEffect(() => {
    //     fetchDevices(item.selectedType.id, item.selectedBrand.id, item.page, 7).then(data => {
    //         item.setDevices(data.rows)
    //         item.setTotalCount(data.count)
    //     })
    // }, [item.page, item.selectedType, item.selectedBrand,])

    return (
        <div className="main_container">
            <div className="category_container">
                <h2 className="items_category">Nike Air Jordan 1 Mid</h2>
                <div className="items_container">
                    {items.map((item) => (
                        <Item key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
});

export default MainPage;