import React from 'react';
import './BasketTableCellImage.css';
// import img from '../../../assets/test.webp';
import {Link} from "react-router-dom";

const BasketTableCellImage = ({ data }) => {
    return (
        <div className="table__cell--image">
            <Link to={`/sneakers/${data.id}/`} className="item__link--image">
                <img className="table__image" src={process.env.REACT_APP_SERVER_ADDRESS + '/' + data.image} alt={data.model} />
            </Link>
        </div>
    )
};

export default BasketTableCellImage;
