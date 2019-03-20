export default class GamePool {
    constructor() {
        this._pool = {};
    }
    getItem(key) {
        var obj;
        if (this._pool[key]) {
            if (this._pool[key].length) {
                obj=this._pool[key].pop();
            }
        }
        return obj;
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
    // getPool(type) {

    // }
    // clearPool(type) {

    // }
}