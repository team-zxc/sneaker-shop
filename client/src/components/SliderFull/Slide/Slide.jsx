import React from 'react';
import SlideImage from "../SlideImage/SlideImage";
import SlideTitle from "../SlideTitle/SlideTitle";
import {Link} from "react-router-dom";

import "./Slide.css";

export default function Slide({ data: { image, model, name, id }, animation }) {
    return (
        <Link to={`/sneakers/${id}`} className={`slide ${animation && 'fadeInAnimation'}`}>
            <SlideImage src={image} alt={model} />
            <SlideTitle title={{model, name}} />
        </Link>
    );
};