import GameMainScene from "./GameMainScene";
import FloorCreateManager from "./FloorCreateManager";
import GamePool from "./GamePool";

export default class ManManager extends Laya.Script3D {
    constructor() {
        super();
        //弹起速度
        this.restiSpeed = new Laya.Vector3(0, 8, 0);
        this.impusle = new Laya.Vector3(0, -2, 0);
        //
        this.manRigby = 0;
        this.equipment = {
            defence: 0,
            speeder: 0,
        }
        //场景容器
        this.floorContainer = 0;
        //观察者
        this.mainSceneObser = 0;
        //相机
        this.camera = 0;
        this.cameraPos = { startY: 0 };
        this.isCameraMove = false;
        this.justNum = 0;
        this.offestNum = 0.8;
        this.rate = -0.05;

        //当前层数
        this.curFloorLayer = 0;
        //玩家得分
        this.playMark = 0;
        //单次得分值
        this.markValuePer = 1;
        //玩家开始位置
        this.manPos = { startY: 0 };
        //连续穿过的floor
        this.constantFloorLayer = 0;
        this.constantSetLayer = 2;

    }
    onAwake() {
        this.gameObj = this.owner;
        this.mainSceneObser = this.gameObj.parent.getComponent(GameMainScene).mainObserver;
    }
    onStart() {
        this.manRigby = this.gameObj.getComponent(Laya.Rigidbody3D);
        this.manRigby.mass = 1;
        this.manRigby.angularDamping = 50;
        this.manPos.startY = this.gameObj.transform.position.y;
        this.cameraPos.startY = this.camera.transform.position.y;
        this.setCameraNum(this.offestNum, this.rate);


    }
    onUpdate() {
        //console.log(this.gameObj.transform.rotation);
        if (this.isCameraMove) {
            this.camera.transform.localPositionY = this.cameraPos.startY + (this.gameObj.transform.position.y - this.manPos.startY);
            this.camera.transform.localPositionY -= this.justNum;
        }
        //if (!this.floorContainer.getChildAt(this.curFloorLayer)) return;
        //下降时
        // if (this.gameObj.transform.position.y< this.floorContainer.getChildAt(this.curFloorLayer).transform.position.y) {
        //     this.toNextFloor();
        // }




    }
    onTriggerEnter(other) {
        switch (other.owner.name) {
            case GameMainScene.floorBarType.blank:
                other.owner.active = false;
                this.toNextFloor();
                break;
            case GameMainScene.floorBarType.normal:
                if (this.constantFloorLayer >= this.constantSetLayer) {
                    this.constantFloorLayer = -1;
                    this.constantEffect(this.floorContainer.getChildAt(this.curFloorLayer));
                }
                else {
                    this.constantFloorLayer = 0;
                }
                this.jumpUp();
                break;
            case GameMainScene.floorBarType.stillObstacle:
            case GameMainScene.floorBarType.abnormal:
                if (this.constantFloorLayer >= this.constantSetLayer) {
                    this.constantFloorLayer = -1;
                    this.constantEffect(this.floorContainer.getChildAt(this.curFloorLayer));
                    this.jumpUp();
                }
                else {
                    //this.constantFloorLayer = 0;
                    this.dispose();
                }
                break;
            default:
                break;
        }
    }
    manForceSet(force, phy) {
        this.manRigby.linearVelocity = force;
        this.manRigby.angularVelocity = Laya.Vector3.ZERO;
        // this.gameObj.transform.localRotation = this.starRotat;
        this.manRigby.applyImpulse(this.impusle);
        // this.interv += Laya.timer.delta * 0.001;
        // if (this.interv < this.riseTime / 2) {
        //     this.gameObj.transform.localPositionY += this.riseDis * Laya.timer.delta * 0.001 / this.riseTime
        // }
        // else if (this.interv < this.riseTime) this.gameObj.transform.localPositionY -= this.riseDis * Laya.timer.delta * 0.001 / this.riseTime
        // else {
        //     this.interv = 0;
        // }
    }
    constantEffect(curFloor) {
        for (let index = 0; index < curFloor._children.length; index++) {
            for (let j = 0; j < curFloor.getChildAt(index)._children.length; j++) {
                const element = curFloor.getChildAt(index).getChildAt(j);
                if (element) {
                    element.transform.translate(new Laya.Vector3(1, 1, 1));
                    element.transform.rotate(new Laya.Vector3(30, 40, 50), false, false)
                }
            }

        }
    }
    toNextFloor() {
        this.manRigby.angularVelocity = Laya.Vector3.ZERO;
        this.manPos.startY = this.gameObj.transform.position.y;//初始位置
        this.cameraPos.startY = this.camera.transform.position.y;
        this.isCameraMove = true;
        this.mainSceneObser.notice("recycle", this.curFloorLayer);
        this.mainSceneObser.notice("creatFloor", 1);
        this.playMark += this.markValuePer;
        Laya.stage.getChildAt(1).getChildAt(0).getChildAt(0).text = "分数:" + this.playMark;
        this.constantFloorLayer++;
        this.curFloorLayer++;
        this.setCameraNum();
    }
    debugTrans(obj) {
        console.log(obj.transform.position);
        console.log(obj.transform.localPosition);
        console.log(obj.transform.rotation);
        console.log(obj.transform.localRotation);
        console.log("------------------");

    }
    //设置偏移值
    setCameraNum() {
        if (this.constantFloorLayer && this.constantFloorLayer % 4 == 0) {
            //todo设置offest偏移
        }
        this.justNum = this.offestNum + this.constantFloorLayer * this.rate;
    }
    dispose() {
        this.manRigby.isKinematic = true;
        if (this.isCameraMove) this.isCameraMove = false;
        this.mainSceneObser.notice("gameOver");
        Laya.timer.once(2000, this, () => {
            var gameOver = Laya.stage.getChildAt(1).getChildAt(0).getChildAt(1);
            gameOver.visible = true;
        })
    }
    jumpUp(name) {
        if (this.isCameraMove) this.isCameraMove = false;
        this.manForceSet(this.restiSpeed);//反弹
        this.setCameraNum();
    }
}