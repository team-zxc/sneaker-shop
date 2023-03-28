import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { uid } from 'uid';
import MainPage from './pages/MainPage/MainPage';
import ItemPage from './pages/ItemPage/ItemPage';
import BasketPage from './pages/BasketPage/BasketPage';
import Header from './components/Header/Header';
import './App.css';
import Footer from './components/Footer/Footer';
import Spinner from 'react-bootstrap/Spinner';

const App = observer(() => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <Spinner animation='border' role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route
                        path="/sneaker/:id"
                        element={<ItemPage key={uid()} />}
                    />
                    <Route path="/basket" element={<BasketPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
});

export default App;
