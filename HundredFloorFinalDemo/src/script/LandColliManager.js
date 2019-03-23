import GamePool from "./GamePool";

export default class LandColliManager extends Laya.Script3D {

    constructor() {
        super();
        this.disTime = 3;
        this.accumtime = 0;
        this.pool =GamePool.getInstance();
    }
    onAwake() {
        this.gameObj = this.owner;
    }
    onEnable() {
        this.accumtime = 0;
    }
    onUpdate() {
        this.accumtime += Laya.timer.delta * 0.001;
        if (this.accumtime >= this.disTime) {
            this.pool.putItem("landTexture", this.gameObj);
        }
    }
}