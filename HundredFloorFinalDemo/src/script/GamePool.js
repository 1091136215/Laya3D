export default class GamePool {
    constructor() {
        this._pool = {};
    }
    getItem(key) {
        if (this._pool[key]) {
            if (this._pool[key].length) {
                return this._pool[key].pop();
            }
        }
    }
    putItem(key, obj) {
        obj.active = false;
        if (this._pool[key]) {
            this._pool[key].push(obj);
        }
        else {
            this._pool[key] = [];
            this._pool[key].push(obj);
        }
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new GamePool();
        }
        return this._instance;
    }
    // getPool(type) {

    // }
    // clearPool(type) {

    // }
}