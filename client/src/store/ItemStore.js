import { makeAutoObservable } from 'mobx';

export default class ItemStore {
    constructor() {
        this._items = [];
        this._models = [];
        makeAutoObservable(this);
    }
    setItems(items) {
        this._items = items;
    }
    get items() {
        return this._items;
    }
    setModels(models) {
        this._models = models;
    }
    get models() {
        return this._models;
    }
}
