import { makeAutoObservable } from 'mobx';

export default class BasketStore {
    constructor() {
        this._items = JSON.parse(localStorage.getItem('basket')) || [];
        makeAutoObservable(this);
    }
    setItems(items) {
        localStorage.setItem('basket', JSON.stringify(items))
        this._items = items;
    }
    addItem(item) {
        this._items.push(item);
    }
    get items() {
        return this._items;
    }
}
