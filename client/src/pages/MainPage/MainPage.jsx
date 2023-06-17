import React from 'react';
import "./MainPage.css";
import Slider from "../../components/SliderFull/Slider/Slider";

const MainPage = () => {
    return (
        <div className="main__container">
            <div className="main__content">
                <Slider />
            </div>
        </div>
    );
};

export default MainPage;