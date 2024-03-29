import React, {useEffect, useState} from 'react';
import "./OrderForm.css";
import Spinner from 'react-bootstrap/Spinner';

const OrderForm = ({ handleDone, handleClose, statusFlag }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [nameDirty, setNameDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [phoneDirty, setPhoneDirty] = useState(false);
    const [nameError, setNameError] = useState("Поле не должно быть пустым");
    const [emailError, setEmailError] = useState("Поле не должно быть пустым");
    const [phoneError, setPhoneError] = useState("Поле не должно быть пустым");
    const [formValid, setFormValid] = useState(false);
    const [nameHovered, setNameHovered] = useState(false);
    const [emailHovered, setEmailHovered] = useState(false);
    const [phoneHovered, setPhoneHovered] = useState(false);

    useEffect(() => {
        if(nameError || emailError || phoneError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [nameError, emailError, phoneError]);

    const nameHandler = (e) => {
        setName(e.target.value);
        const re = /^[a-zA-Zа-яА-Я0-9\s]*$/;
        if(!re.test(String(e.target.value))) {
            setNameError("Не должно содержать спец. символы");
            setNameHovered(true);
        } else {
            setNameError("");
            setNameHovered(false);
        }
        if(!e.target.value) {
            setNameError("Поле не должно быть пустым");
        }
    };

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError("example@example.ru");
            setEmailHovered(true);
        } else {
            setEmailError("");
            setEmailHovered(false);
        }
        if(!e.target.value) {
            setEmailError("Поле не должно быть пустым");
        }
    };

    const phoneHandler = (e) => {
        setPhone(e.target.value);
        // eslint-disable-next-line
        const re = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setPhoneError("+7XXXXXXXXXX или 8XXXXXXXXXX");
            setPhoneHovered(true);
        } else {
            setPhoneError("");
            setPhoneHovered(false);
        }
        if(!e.target.value) {
            setPhoneError("Поле не должно быть пустым");
        }
    };

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true);
                break
            case 'email':
                setEmailDirty(true);
                break
            case 'tel':
                setPhoneDirty(true);
                break
            default:
                break
        }
    };

    const isHasVal = (e) => {
        if (e.target.value !== "") {
            e.target.classList.add("has-val");
        } else {
            e.target.classList.remove("has-val");
        }
    };

    const handleMouseLeave = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameHovered(false);
                break;
            case 'email':
                setEmailHovered(false);
                break;
            case 'tel':
                setPhoneHovered(false);
                break;
            default:
                break;
        }
    };

    return (
        <div className="limiter">
            <div className="order-form__container">
                <div className="order-form__close" onClick={handleClose}>
                    <span className="close__btn"></span>
                </div>
                <div className="wrapper">
                    <form className="order-form__content" onSubmit={(event) => handleDone(event, {name, email, phone})}>
                        <span className="order-form__title">Welcome</span>
                        <div className="order-form__logo"></div>
                        <div className="order-form__wrap-input">
                            {(nameDirty && nameError) && (
                                <div
                                    className="valid__message"
                                    style={{ visibility: nameHovered ? 'visible' : 'hidden' }}
                                >
                                    {nameError}
                                </div>
                            )}
                            <input
                                value={name}
                                onBlur={e => blurHandler(e)}
                                onMouseLeave={(e) => handleMouseLeave(e)}
                                type="text"
                                className="input"
                                name="name"
                                onChange={(e) => {
                                    isHasVal(e);
                                    nameHandler(e);
                                }}
                            />
                            <span className="focus-input" data-placeholder="Name"></span>
                            {nameError &&
                                <div
                                    className={`input-validation-square ${nameHovered ? 'active' : ''}`}
                                    onMouseEnter={() => setNameHovered(true)}
                                    onMouseLeave={() => setNameHovered(false)}
                                ></div>
                            }
                        </div>
                        <div className="order-form__wrap-input">
                            {(emailDirty && emailError) && (
                                <div
                                    className="valid__message"
                                    style={{ visibility: emailHovered ? 'visible' : 'hidden' }}
                                >
                                    {emailError}
                                </div>
                            )}
                            <input
                                value={email}
                                onBlur={e => blurHandler(e)}
                                onMouseLeave={(e) => handleMouseLeave(e)}
                                type="email"
                                className="input"
                                name="email"
                                onChange={(e) => {
                                    isHasVal(e);
                                    emailHandler(e);
                                }}
                            />
                            <span className="focus-input" data-placeholder="Email"></span>
                            {emailError &&
                                <div
                                    className={`input-validation-square ${emailHovered ? 'active' : ''}`}
                                    onMouseEnter={() => setEmailHovered(true)}
                                    onMouseLeave={() => setEmailHovered(false)}
                                ></div>
                            }
                        </div>
                        <div className="order-form__wrap-input">
                            {(phoneDirty && phoneError) && (
                                <div
                                    className="valid__message"
                                    style={{ visibility: phoneHovered ? 'visible' : 'hidden' }}
                                >
                                    {phoneError}
                                </div>
                            )}
                            <input
                                value={phone}
                                onBlur={e => blurHandler(e)}
                                onMouseLeave={(e) => handleMouseLeave(e)}
                                type="tel"
                                className="input"
                                name="tel"
                                onChange={(e) => {
                                    isHasVal(e);
                                    phoneHandler(e);
                                }}
                            />
                            <span className="focus-input" data-placeholder="Phone"></span>
                            {phoneError &&
                                <div
                                    className={`input-validation-square ${phoneHovered ? 'active' : ''}`}
                                    onMouseEnter={() => setPhoneHovered(true)}
                                    onMouseLeave={() => setPhoneHovered(false)}
                                ></div>
                            }
                        </div>
                        <div className="container__order-form-btn">
                            <div className="wrap__btn">
                                <div className="anim"></div>
                                {statusFlag
                                    ?
                                    <Spinner animation='border' role="status">
                                        <span className="visually-hidden fix"></span>
                                    </Spinner>
                                    :
                                    <button
                                        disabled={!formValid}
                                        type="submit"
                                        className="order-form__btn"
                                    >
                                        Отправить
                                    </button>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OrderForm;