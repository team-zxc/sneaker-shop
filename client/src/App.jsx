import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { uid } from 'uid';
import ItemPage from './pages/ItemPage/ItemPage';
import BasketPage from './pages/BasketPage/BasketPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from "./pages/MainPage/MainPage";
import FilteredPage from "./pages/FilteredPage/FilteredPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import './App.css';

const App = observer(() => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <Spinner animation='border' role="status">
                <span className="visually-hidden">Загрузка...</span>
            </Spinner>
        );
    }

    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/sneakers" element={<FilteredPage />} />
                    <Route path="/sneakers/:id" element={<ItemPage key={uid()} />} />
                    <Route path="/basket" element={<BasketPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
});

export default App;
