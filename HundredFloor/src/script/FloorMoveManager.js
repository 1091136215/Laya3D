import GameMainScene from "./GameMainScene";

export default class FloorMoveManager extends Laya.Script3D {
    constructor() {
        super();
        this.yawPitchRoll = new Laya.Vector3();
        this.tempRotationZ = new Laya.Quaternion();
        this.rotaionSpeed = 0.0005;
        //obser
        this.mainSceneObser = 0;
        this.isDispose = false;
    }
    onAwake() {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        this.gameObj = this.owner;
        this.mainSceneObser = this.gameObj.parent.getComponent(GameMainScene).mainObserver;
        this.mainSceneObser.watch("gameOver", this.disPose.bind(this));
    }
    _onDestroy() {
        //关闭监听函数
        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
    }
    onUpdate(state) {
        if (this.isDispose) return;
        var elapsedTime = Laya.timer.delta;
        if (!isNaN(this.lastMouseX) && this.isMouseDown) {
            var offsetX = Laya.stage.mouseX - this.lastMouseX;
            var yprElem = this.yawPitchRoll;
            yprElem.x += offsetX * this.rotaionSpeed * elapsedTime;
            // this.updateRotation();
            this.updateRotate(offsetX * this.rotaionSpeed * elapsedTime);
        }
        this.lastMouseX = Laya.stage.mouseX;
    }
    mouseDown(e) {
        //获得鼠标的旋转值
        this.gameObj.transform.localRotation.getYawPitchRoll(this.yawPitchRoll);
        //获得鼠标的x值
        this.lastMouseX = Laya.stage.mouseX;
        //设置bool值
        this.isMouseDown = true;

    }
    mouseUp(e) {
        //设置bool值
        this.isMouseDown = false;
    }
    updateRotation() {
        Laya.Quaternion.createFromYawPitchRoll(this.yawPitchRoll.x, this.yawPitchRoll.y, this.yawPitchRoll.z, this.tempRotationZ);
        this.tempRotationZ.cloneTo(this.gameObj.transform.localRotation);
        this.gameObj.transform.localRotation = this.gameObj.transform.localRotation;
    }
    updateRotate(k) {
        this.gameObj.transform.rotate(new Laya.Vector3(0, k, 0))
    }
    disPose() {
        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
        this.isDispose = true;
    }
}