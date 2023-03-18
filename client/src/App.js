import React, {useContext} from 'react';
import { Route, Routes } from "react-router";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import MainPage from "./pages/MainPage/MainPage";
import ItemPage from "./pages/ItemPage/ItemPage";
import BasketPage from "./pages/BasketPage/BasketPage";
import Header from "./components/Header/Header";
import "./App.css";
import Footer from "./components/Footer/Footer";

const App = observer(() => {
    // const {item} = useContext(Context)

    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={ <MainPage /> } />
                    <Route path='/sneaker/:id' element={ <ItemPage /> } />
                    <Route path='/basket' element={ <BasketPage /> } />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
});

export default App;
