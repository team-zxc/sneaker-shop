import React from 'react';
import SlideImage from "../SlideImage/SlideImage";
import SlideTitle from "../SlideTitle/SlideTitle";
import {Link} from "react-router-dom";

import "./Slide.css";

export default function Slide({ data: { images, model, name, id }, animation }) {
    const get_first_image = (data) => {
        return data[0]
    }

    return (
        <Link to={`/sneakers/${id}`} className={`slide ${animation && 'fadeInAnimation'}`}>
            <SlideImage src={process.env.REACT_APP_SERVER_ADDRESS + '/' + get_first_image(images)} alt={model} />
            <SlideTitle title={{model, name}} />
        </Link>
    );
};