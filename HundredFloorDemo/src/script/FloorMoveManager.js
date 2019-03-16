export default class FloorMoveManager extends Laya.Script3D {
    constructor() {
        super();
        this.yawPitchRoll = new Laya.Vector3();
        this.tempRotationZ = new Laya.Quaternion();
        this.rotaionSpeed = 0.0005;
    }
    onAwake() {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        this.gameObj = this.owner;
    }
    _onDestroy() {
        //关闭监听函数
        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
    }
    onUpdate(state) {
        var elapsedTime = Laya.timer.delta;
        if (!isNaN(this.lastMouseX) && this.isMouseDown) {
            var scene = this.owner.scene;
            var offsetX = Laya.stage.mouseX - this.lastMouseX;
            var yprElem = this.yawPitchRoll;
            yprElem.x += offsetX * this.rotaionSpeed * elapsedTime;
            this.updateRotation();
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
}