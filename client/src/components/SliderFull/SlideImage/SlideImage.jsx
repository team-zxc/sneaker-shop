import React from "react";
import img from '../../../assets/test.webp';

import "./SlideImage.css";

// export default function SlideImage({ src, alt }) {
//     return <img src={src} alt={alt} className="slide-image" />;
// }

export default function SlideImage({ src, alt }) {
    return (
        <img src={img} alt={alt} className="slide-image" />
    );
}