import GameMainScene from "./GameMainScene";
import GamePool from "./GamePool";

export default class FloorBarManager extends Laya.Script3D {

    constructor() {
        super();
        //设定速度
        this.rotationData = 0;
        this.rotateVec = Laya.Vector3.ZERO;
        this.timeInterv = 0;
        this.rotationSpeed = 0.7;
        this.flag = false;
        //obser
        this.mainSceneObser = 0;
        this.isDispose = false;
        //pool
        this.floorBarPool = 0;
        this.floorRecycle = 2;
        this.trans = { pos: 0, rot: 0 }

    }
    onAwake() {
        this.gameObj = this.owner;
    }
    onStart() {
        this.mainSceneObser.watch("gameOver", this.disPose.bind(this));
        this.mainSceneObser.watch("recycle", this.recycleObj.bind(this));
        this.trans.pos = this.gameObj.transform.position;
        this.trans.rot = this.gameObj.transform.rotation;
    }
    onEnable() {
        this.timeInterv = 0;
    }
    onUpdate() {
        return;
        if (this.isDispose) return;
        if (this.gameObj.name === GameMainScene.floorBarType.abnormal && this.rotationData !== 0) {
            this.timeInterv += this.rotationSpeed;
            this.rotateVec.setValue(0, 0, this.rotationSpeed * (this.flag ? 1 : -1));
            this.gameObj.transform.rotate(this.rotateVec, true, false);
            if (this.timeInterv > this.rotationData) {
                this.timeInterv = 0;
                this.flag = !this.flag;
            }
        }
    }
    onDisable() {
        this.gameObj.transform.position = this.trans.pos;
        this.gameObj.transform.rotation = this.trans.rot;
    }

    disPose() {
        this.isDispose = true;
    }
    recycleObj(curFloorIndex) {
        if (curFloorIndex - this.floorRecycle >= 0) {
            var index = this.gameObj.parent.parent.parent.getChildIndex(this.gameObj.parent.parent);
            if (index == curFloorIndex - this.floorRecycle) {
                var obj = this.gameObj//.parent.removeChild(this.gameObj);
                this.floorBarPool.putItem(obj.name, obj);
                // obj.parent && this.floorBarPool.putItem(GameMainScene.floorBarType.blank, obj.parent)
            }
        }
    }
}