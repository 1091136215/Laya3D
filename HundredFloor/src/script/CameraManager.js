import GameMainScene from "./GameMainScene";
import Observer from "./Observer";


export default class CameraManager extends Laya.Script3D {
    constructor() {
        super();
        this._tempVector3 = new Laya.Vector3();
        this.yawPitchRoll = new Laya.Vector3();
        this.resultRotation = new Laya.Quaternion();
        this.tempRotationZ = new Laya.Quaternion();
        this.tempRotationX = new Laya.Quaternion();
        this.tempRotationY = new Laya.Quaternion();
        this.rotaionSpeed = 0.00006;
        this.cameraDebug = true;
        //0.34,4.87,-0.62 pos
        //0.062,0.718,0.693,-0.015 rot
        //this.startPos = new Laya.Vector3(0.34,4.87,-0.62);
        //this.startRotation = new Laya.Vector4(0.062,0.718,0.693,-0.015);
        //观察者
        this.mainSceneObser = 0;
    }
    onAwake() {
        this.camera = this.owner;
        this.mainSceneObser = this.camera.parent.getComponent(GameMainScene).mainObserver;
        if (this.cameraDebug) {
            Laya.stage.on(Laya.Event.RIGHT_MOUSE_DOWN, this, this.mouseDown);
            Laya.stage.on(Laya.Event.RIGHT_MOUSE_UP, this, this.mouseUp);
        }
        //this.setPosAndRotation(true, this.startPos, this.startRotation);
        this.mainSceneObser.watch("cameraMove", this.setPosAndRotation.bind(this));
    }
    _onDestroy() {
        //关闭监听函数
        Laya.stage.off(Laya.Event.RIGHT_MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.off(Laya.Event.RIGHT_MOUSE_UP, this, this.mouseUp);
    }
    onUpdate(state) {
       
        if (!this.cameraDebug) return;
        Laya.KeyBoardManager.hasKeyDown(37) && this.showPosAndRotation(null,0.01,null);
        Laya.KeyBoardManager.hasKeyDown(39) && this.showPosAndRotation(null,-0.01,null);
        Laya.KeyBoardManager.hasKeyDown(38) &&this.updateRotate(null,null,0.01);//E
        Laya.KeyBoardManager.hasKeyDown(40) &&this.updateRotate(null,null,-0.01);//E
        var elapsedTime = Laya.timer.delta;
        // if (!isNaN(this.lastMouseX) && !isNaN(this.lastMouseY) && this.isMouseDown) {
        //     var scene = this.owner.scene;
        //     Laya.KeyBoardManager.hasKeyDown(87) && this.moveForward(-0.01 * elapsedTime);//W
        //     Laya.KeyBoardManager.hasKeyDown(83) && this.moveForward(0.01 * elapsedTime);//S
        //     Laya.KeyBoardManager.hasKeyDown(65) && this.moveRight(-0.01 * elapsedTime);//A
        //     Laya.KeyBoardManager.hasKeyDown(68) && this.moveRight(0.01 * elapsedTime);//D
        //     Laya.KeyBoardManager.hasKeyDown(81) && this.moveVertical(0.01 * elapsedTime);//Q
        //     Laya.KeyBoardManager.hasKeyDown(69) && this.moveVertical(-0.01 * elapsedTime);//E

        //     var offsetX = Laya.stage.mouseX - this.lastMouseX;
        //     var offsetY = Laya.stage.mouseY - this.lastMouseY;

        //     var yprElem = this.yawPitchRoll;
        //     yprElem.x -= offsetX * this.rotaionSpeed * elapsedTime;
        //     yprElem.y -= offsetY * this.rotaionSpeed * elapsedTime;
        //     //this.updateRotation();
        //    // this.updateRotate(offsetX * this.rotaionSpeed * elapsedTime,offsetY * this.rotaionSpeed * elapsedTime)
        // }
        // this.lastMouseX = Laya.stage.mouseX;
        // this.lastMouseY = Laya.stage.mouseY;


    }
    mouseDown(e) {
        this.showPosAndRotation();
        // if (!this.cameraDebug) return;
        // //获得鼠标的旋转值
        // this.camera.transform.localRotation.getYawPitchRoll(this.yawPitchRoll);
        // //获得鼠标的xy值
        // this.lastMouseX = Laya.stage.mouseX;
        // this.lastMouseY = Laya.stage.mouseY;
        // //设置bool值
        // this.isMouseDown = true;

    }
    mouseUp(e) {
        if (!this.cameraDebug) return;
        //设置bool值
        this.isMouseDown = false;
    }
    /**
     * 向前移动。
     */
    moveForward(distance) {
        this._tempVector3.x = 0;
        this._tempVector3.y = 0;
        this._tempVector3.z = distance;
        this.camera.transform.translate(this._tempVector3);
    }
    /**
     * 向右移动。
     */
    moveRight(distance) {
        this._tempVector3.y = 0;
        this._tempVector3.z = 0;
        this._tempVector3.x = distance;
        this.camera.transform.translate(this._tempVector3);
    }
    /**
     * 向上移动。
     */
    moveVertical(distance) {
        this._tempVector3.x = this._tempVector3.z = 0;
        this._tempVector3.y = distance;
        this.camera.transform.translate(this._tempVector3, false);
    }

    updateRotation() {
       // if (Math.abs(this.yawPitchRoll.y) < 1.50) {
            Laya.Quaternion.createFromYawPitchRoll(this.yawPitchRoll.x, this.yawPitchRoll.y, this.yawPitchRoll.z, this.tempRotationZ);
            this.tempRotationZ.cloneTo(this.camera.transform.localRotation);
            this.camera.transform.localRotation = this.camera.transform.localRotation;
       // }
    }
    showPosAndRotation() {
        console.log("information:Position");
        console.log(this.camera.transform.position);
        console.log("information:Rotation");
        console.log(this.camera.transform.rotation);
    }
    setPosAndRotation(isInit, pos, rotation) {
        if (pos) {
            var posInfo = {
                curPos: this.camera.transform.position,
                changePos: pos
            }
            if (isInit) {
                this.camera.transform.position = posInfo.changePos;
            }
            else {
                let finalPos=new Laya.Vector3(0,0,0);
                Laya.Vector3.add(posInfo.curPos,posInfo.changePos,finalPos);
                this.camera.transform.localPosition =finalPos;
            }
        }
        if (rotation) {
            var rotationInfo = {
                curRotation: this.camera.transform.rotation,
                changeRotation: rotation
            }
            if (isInit) {
                this.camera.transform.rotation = rotationInfo.changeRotation;
            }
            else {
                let finalRotation=new Laya.Vector4(0,0,0,0);
                Laya.Vector4.add(rotationInfo.changeRotation,rotationInfo.curRotation,finalRotation);
                this.camera.transform.rotation = finalRotation;
            }
        }

    }
    updateRotate(k,b,z) {
        if(k&&b){
            this.camera.transform.rotate(new Laya.Vector3(k, 0, b))
        }
       if(z){
        this.camera.transform.rotate(new Laya.Vector3(0, z, 0))
       }
    }
}