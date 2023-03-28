import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import BasketStore from './store/BasketStore';
import ItemStore from './store/ItemStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Context.Provider
            value={{
                item: new ItemStore(),
                basket: new BasketStore(),
            }}
        >
            <App />
        </Context.Provider>
    </React.StrictMode>
);
