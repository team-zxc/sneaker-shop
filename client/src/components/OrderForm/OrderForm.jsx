import React, {useEffect, useState} from 'react';
import "./OrderForm.css";

const OrderForm = ({ handleDone, handleClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [nameDirty, setNameDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [phoneDirty, setPhoneDirty] = useState(false);
    const [nameError, setNameError] = useState("Name must not be empty");
    const [emailError, setEmailError] = useState("Email must not be empty");
    const [phoneError, setPhoneError] = useState("Phone must not be empty");
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if(nameError || emailError || phoneError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [nameError, emailError, phoneError]);

    const nameHandler = (e) => {
        setName(e.target.value);
        const re = /^[A-Z][a-z]*$/;
        if(!re.test(String(e.target.value))) {
            setNameError("The name must begin with a capital letter");
            if(!e.target.value) {
                setNameError("Name must not be empty");
            }
        } else {
            setNameError("");
        }
    };

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError("Valid is abc@def.hi");
            if(!e.target.value) {
                setEmailError("Email must not be empty");
            }
        } else {
            setEmailError("");
        }
    };

    const phoneHandler = (e) => {
        setPhone(e.target.value);
        // eslint-disable-next-line
        const re = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setPhoneError("Uncorrected phone: +79876543210");
            if(!e.target.value) {
                setPhoneError("Phone must not be empty");
            }
        } else {
            setPhoneError("");
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

    return (
        <div className="limiter">
            <div className="order-form__container">
                <div className="order-form__close" onClick={handleClose}>
                    <span className="close__btn"></span>
                </div>
                <div className="wrapper">
                    <form className="order-form__content" onSubmit={handleDone}>
                        <span className="order-form__title">Welcome</span>
                        <div className="order-form__logo"></div>
                        <div className="order-form__wrap-input">
                            {(nameDirty && nameError) && <div className="valid__message">{nameError}</div>}
                            <input value={name} onBlur={e => blurHandler(e)} type="text" className="input" name="name" onChange={(e) => {
                                isHasVal(e);
                                nameHandler(e);
                            }} />
                            <span className="focus-input" data-placeholder="Name"></span>
                        </div>
                        <div className="order-form__wrap-input">
                            {(emailDirty && emailError) && <div className="valid__message">{emailError}</div>}
                            <input value={email} onBlur={e => blurHandler(e)} type="email" className="input" name="email" onChange={(e) => {
                                isHasVal(e);
                                emailHandler(e);
                            }} />
                            <span className="focus-input" data-placeholder="Email"></span>
                        </div>
                        <div className="order-form__wrap-input">
                            {(phoneDirty && phoneError) && <div className="valid__message">{phoneError}</div>}
                            <input value={phone} onBlur={e => blurHandler(e)} type="tel" className="input" name="tel" onChange={(e) => {
                                isHasVal(e);
                                phoneHandler(e);
                            }} />
                            <span className="focus-input" data-placeholder="Phone"></span>
                        </div>
                        <div className="container__order-form-btn">
                            <div className="wrap__btn">
                                <div className="anim"></div>
                                <button disabled={!formValid} type="submit" className="order-form__btn">Отправить</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OrderForm;