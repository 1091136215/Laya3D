export default class Observer {

    constructor() {
        this._dictionary = {};
    }
    watch(key, func) {
        if (this._dictionary[key]) {
            if (this._dictionary[key] != func) {
                this._dictionary[key].push(func);
            }
        }
        else {
            this._dictionary[key] = [];
            this._dictionary[key].push(func);
        }
    }
    notice(key, ...args) {
        for (let obj in this._dictionary[key]) {
            if (this._dictionary[key].hasOwnProperty(obj)) {
                let element = this._dictionary[key][obj]
                element(...args);
            }
        }
    }
    removeAllObserver() {
        this._dictionary = {};
    }
    removeObserverByType(type) {
        if (this._dictionary.hasKey(type)) {
            delete this._dictionary.type;
        }
    }

}