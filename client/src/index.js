import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ItemStore from "./store/ItemStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        item: new ItemStore(),
    }}>
        <App />
    </Context.Provider>
);
