import React from "react";

import "./SlideTitle.css";

export default function SlideTitle({ title }) {
    return <div className="slide-title">{title.name !== "" ? title.model + ' "' + title.name + '"' : title.model}</div>;
}