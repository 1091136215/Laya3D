import GameMainScene from "./GameMainScene";
import FloorCreateManager from "./FloorCreateManager";
import GamePool from "./GamePool";
import Observer from "./Observer";
import LandColliManager from "./LandColliManager";

export default class ManManager extends Laya.Script3D {
    constructor() {
        super();
        //弹起速度
        this.restiSpeed = new Laya.Vector3(0, 6, 0);
        this.impusle = new Laya.Vector3(0, -2, 0);
        //pool
        this.manPool = GamePool.getInstance();
        this.manRigby = 0;
        //玩家道具
        this.equipment = {
            defence: 0,
            speeder: 0,
            doubleMark: 0
        }
        //场景容器
        this.floorContainer = 0;
        //观察者
        this.mainSceneObser = 0;
        //相机
        this.camera = 0;

        //玩家得分
        this.playMark = 0;
        //单次得分值
        this.marksetValuePer = 1;
        this.markValuePer = 0;
        //当前层数
        this.curFloorLayer = 0;
        //连续穿过的floor
        this.constantSetLayer = 2;
        this.constantFloorLayer = 0;

        //player
        this.whiteColor = new Laya.Vector4(1, 1, 1, 1);
        this.whiteTrail = new Laya.Vector4(0, 0.8980, 0.8271, 0.5019608);
        this.redColor = new Laya.Vector4(1, 0, 0, 1);
        this.redTrail = new Laya.Vector4(1, 0, 0, 1);
        //撞击特效模型
        this.landColliEft = 0;
        this.landColliClone = 0;
        this.landOffest = 0.2;
        //玩家贴图
        this.manTexture = 0;
        //玩家到相机的距离
        this.disToCamera = 5;
        //
        this.offestNum = 0.5;
    }
    onAwake() {
        this.gameObj = this.owner;
        this.mainSceneObser = this.gameObj.parent.getComponent(GameMainScene).mainObserver;
    }
    onStart() {
        this.manRigby = this.gameObj.getComponent(Laya.Rigidbody3D);
        this.manRigby.mass = 2;
        this.manRigby.linearDamping = 0.1;
        this.dampRate = 0.001;
        this.markValuePer = this.marksetValuePer;
        this.gameObj.meshRenderer.material.albedoTexture = null;
        this.manTexture = null

    }
    onUpdate() {
        if (this.camera.transform.localPositionY > this.gameObj.transform.position.y + this.disToCamera) {
            this.camera.transform.localPositionY = this.gameObj.transform.position.y + this.disToCamera;
        }
        if (this.gameObj.transform.localPositionY + this.offestNum < this.floorContainer.getChildAt(this.curFloorLayer).transform.position.y) {
            this.toNextFloor();
        }
    }
    onTriggerEnter(other) {
        switch (other.owner.name) {
            case GameMainScene.floorBarType.normal:
                this.contactNormalFloor(other.owner);
                break;
            case GameMainScene.floorBarType.stillObstacle:
            case GameMainScene.floorBarType.abnormal:
                this.contactRiskFloor(other.owner);
                break;
            case GameMainScene.floorBarType.doubleMark:
            case GameMainScene.floorBarType.defence:
            case GameMainScene.floorBarType.rocket:
                // this.manPool.putItem(other.owner.name, other.owner);
                other.owner.active = false;
                this.GetEquipment(other.owner.name);
                break;
            default:
                break;
        }
    }
    contactNormalFloor(obj) {
        if (this.constantFloorLayer >= this.constantSetLayer) {
            this.startCoroutine("once", 0.2, this, () => {
                this.constantFloorLayer = -1;
                this.gameObj.getChildAt(0).trailRenderer.material.color = this.whiteTrail;
            })
            this.jumpUp(obj, 0);
            this.constantEffect(this.floorContainer.getChildAt(this.curFloorLayer));
        }
        else {
            this.jumpUp(obj, 1);
            this.constantFloorLayer = 0;
        }
    }
    contactRiskFloor(obj) {
        if (this.constantFloorLayer >= this.constantSetLayer) {
            this.startCoroutine("once", 0.2, this, () => {
                this.constantFloorLayer = -1;
                this.gameObj.getChildAt(0).trailRenderer.material.color = this.whiteTrail;

            })
            this.jumpUp(obj, 0);
            this.constantEffect(this.floorContainer.getChildAt(this.curFloorLayer));
        }
        else {
            if (this.equipment.defence || this.equipment.speeder) {
                this.jumpUp(obj, 1);
                return;
            }
            this.dispose();
            this.constantFloorLayer = 0;
        }
    }
    toNextFloor(obj) {
        this.mainSceneObser.notice("recycle", this.curFloorLayer);
        this.mainSceneObser.notice("creatFloor", 1);
        this.markValuePer = this.marksetValuePer;
        if (this.equipment.doubleMark) {
            this.markValuePer = 2 * this.marksetValuePer;
        }
        this.playMark += this.markValuePer;
        Laya.stage.getChildAt(1).getChildAt(0).getChildAt(0).text = "分数:" + this.playMark;
        if (!this.equipment.speeder) {
            this.constantFloorLayer++;
        }
        this.curFloorLayer++;
        //改变球颜色
        if (this.constantFloorLayer >= this.constantSetLayer) {
            this.gameObj.getChildAt(0).trailRenderer.material.color = this.redTrail;
        }
    }
    //施加速度
    manForceSet(force) {
        if (this.equipment.speeder) return;
        this.manRigby.linearVelocity = force;
    }
    //撞碎一层效果
    constantEffect(curFloor) {
        for (let index = 0; index < curFloor._children.length; index++) {
            for (let j = 0; j < curFloor.getChildAt(index)._children.length; j++) {
                const element = curFloor.getChildAt(index).getChildAt(j);
                if (element.name != GameMainScene.floorBarType.normal) {
                    element.active = false;
                }
                if (element) {
                    element.transform.translate(new Laya.Vector3(1, 1, 1));
                    element.transform.rotate(new Laya.Vector3(30, 40, 50), false, false)
                }
            }

        }
    }
    //结束
    dispose() {
        this.manRigby.isKinematic = true;
        Laya.timer.clearAll(this);
        this.gameObj.getChildAt(1).active = false;
        this.mainSceneObser.notice("gameOver");
        Laya.timer.once(2000, this, () => {
            let gameOver = Laya.stage.getChildAt(1).getChildAt(0).getChildAt(4);
            gameOver.visible = true;
        })
    }

    jumpUp(obj, isShow) {
        this.manForceSet(this.restiSpeed);//反弹
        this.colliFlooreffect(obj, isShow);
    }
    //撞击地面特效
    colliFlooreffect(obj, isShow) {
        if (!isShow) return;
        this.landColliClone = this.CloneObj(this.landColliEft, obj, "landTexture");
        this.landColliClone.active = true;
        this.landColliClone.transform.position = this.gameObj.transform.position;
        this.landColliClone.transform.localPositionZ = obj.transform.localPositionZ + this.landOffest;
        if (!this.landColliClone.getComponent(LandColliManager)) {
            this.landColliClone.addComponent(LandColliManager);
        }
    }
    /**
     * 开启协程
     * @param {*} type: "Loop","once"
     * @param {*} interv:间隔(秒)
     * @param {*} caller:调用者
     * @param {*} callback:回调
     * @param {*} isRecover:是否覆盖协程默认true
     * @param {*} args:回调参数
     */
    startCoroutine(type, interv, caller, callback, isRecover = true, ...args) {
        if (type === "loop") {
            Laya.timer.loop(interv * 1000, caller, callback, [...args], isRecover)
        }
        if (type === "once") {
            Laya.timer.once(interv * 1000, caller, callback, [...args], isRecover);
        }
    }
    GetEquipment(type) {
        switch (type) {
            case GameMainScene.floorBarType.doubleMark:
                this.equipment.doubleMark = 1;
                Laya.stage.getChildAt(1).getChildAt(0).getChildAt(1).text = "双倍:" + this.equipment.doubleMark;
                this.gameObj.meshRenderer.material.albedoTexture = Laya.loader.getRes("res/2X_qiuti.png");
                this.startCoroutine("once", 3, this, this.MarkDis);
                break;
            case GameMainScene.floorBarType.defence:
                //get defence
                this.equipment.defence = 1;
                Laya.stage.getChildAt(1).getChildAt(0).getChildAt(2).text = "护盾:" + this.equipment.defence;
                this.gameObj.meshRenderer.material.albedoTexture = Laya.loader.getRes("res/fudun_qiuti.png");
                this.startCoroutine("once", 3, this, this.DefenceDis);
                break;
            case GameMainScene.floorBarType.rocket:
                //speed up
                this.equipment.speeder = 1;
                Laya.stage.getChildAt(1).getChildAt(0).getChildAt(3).text = "火箭:" + this.equipment.speeder;
                this.gameObj.meshRenderer.material.albedoTexture = Laya.loader.getRes("res/huojian_qiuti.png");
                this.startCoroutine("once", 1.5, this, this.RocketDis);
                break;
            default:
                break;
        }
    }
    MarkDis() {
        this.equipment.doubleMark = 0;
        Laya.stage.getChildAt(1).getChildAt(0).getChildAt(1).text = "双倍:" + 0;
        this.gameObj.meshRenderer.material.albedoTexture = this.manTexture;
    }
    DefenceDis() {
        this.equipment.defence = 0;
        Laya.stage.getChildAt(1).getChildAt(0).getChildAt(2).text = "护盾:" + 0;
        this.gameObj.meshRenderer.material.albedoTexture = this.manTexture;
    }
    RocketDis() {
        this.equipment.speeder = 0;
        Laya.stage.getChildAt(1).getChildAt(0).getChildAt(3).text = "火箭:" + 0;
        this.gameObj.meshRenderer.material.albedoTexture = this.manTexture;
    }
    //克隆物体
    CloneObj(moudle, parent, name) {
        var clone = this.manPool.getItem(name);
        if (clone) {
            parent.addChild(clone);

        }
        else {
            clone = Laya.Sprite3D.instantiate(moudle, parent, false);
            clone.name = name;
        }
        clone.transform.position = moudle.transform.position;
        clone.transform.rotation = moudle.transform.rotation;

        return clone;
    }
}