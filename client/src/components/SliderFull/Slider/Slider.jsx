import React, { useEffect, useState, createContext } from 'react';
import PropTypes from "prop-types";
// import rateItems from "../../../rathingItems";

import Arrows from "../Arrows/Arrows";
import Dots from "../Dots/Dots";

import Slide from "../Slide/Slide";

import "./Slider.css";
import {Link} from "react-router-dom";
import {fetchPopularItems} from "../../../http/itemApi";

export const SliderContext = createContext(null);

const Slider = function ({ width, height, autoPlay, autoPlayTime }) {
    const [items, setItems] = useState([]);
    const [slide, setSlide] = useState(0);
    const [animation, setAnimation] = useState(true);

    const get_first_image = (data) => {
        return data[0]
    }

    useEffect(() => {
        const loadData = () => {
            fetchPopularItems(8).then(data => setItems(data))
            // setItems(rateItems);
        };
        loadData();
    }, []);

    const preloadImages = () => {
        const prevItemIndex = slide - 1 < 0 ? items.length - 1 : slide - 1;
        const nextItemIndex = (slide + 1) % items.length;

        new Image().src = get_first_image(items[slide].images);
        new Image().src = get_first_image(items[prevItemIndex].images);
        new Image().src = get_first_image(items[nextItemIndex].images);
    }

    useEffect(() => {
        if (items.length) {
            preloadImages();
        }
    }, [slide, items])

    const changeSlide = (direction = 1) => {
        let slideNumber = 0;
        setAnimation(false);

        if (slide + direction < 0) {
            slideNumber = items.length - 1;
        } else {
            slideNumber = (slide + direction) % items.length;
        }

        setSlide(slideNumber);

        const timeout = setTimeout(() => {
            setAnimation(true);
        }, 0);

        return () => {
            clearTimeout(timeout)
        }
    };

    const goToSlide = (number) => {
        setAnimation(false);
        setSlide(number % items.length);

        const timeout = setTimeout(() => {
            setAnimation(true);
        }, 0);

        return () => {
            clearTimeout(timeout)
        }
    };

    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            changeSlide(1);
        }, autoPlayTime);

        return () => {
            clearInterval(interval);
        };
    }, [items.length, slide]); // when static uploaded or slide changed manually we start timer

    return (
        <div style={{ width, height }} className="slider">
            <div className="slider__title">Популярное</div>
            <SliderContext.Provider
                value={{
                    goToSlide,
                    changeSlide,
                    slidesCount: items.length,
                    slideNumber: slide,
                    items,
                }}
            >
                <Arrows />
                {
                    items.length ? (
                        <Slide data={items[slide]} animation={animation} />
                    ) : null
                }
                <Link to="/sneakers" className="btn__all" >Показать все</Link>
                <Dots />
            </SliderContext.Provider>
        </div>
    );
};

Slider.propTypes = {
    autoPlay: PropTypes.bool,
    autoPlayTime: PropTypes.number,
    width: PropTypes.string,
    height: PropTypes.string
};

Slider.defaultProps = {
    autoPlay: true,
    autoPlayTime: 5000,
    width: "100%",
    height: "100%"
};

export default Slider;