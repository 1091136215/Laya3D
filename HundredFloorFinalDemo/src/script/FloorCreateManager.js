import GameMainScene from "./GameMainScene";
import FloorBarManager from "./FloorBarManager";
import GamePool from "./GamePool";

export default class FloorCreateManager extends Laya.Script3D {
    constructor() {
        super();
        //观察者
        this.mainSceneObser = 0;
        //对象池
        this.floorBarPool = GamePool.getInstance();
        //预制体数组
        this.prefabArr = 0;
        //一次性生产Floor层数
        this.creatLayer = 4;
        //每层之间的间隔y值
        this.FloorInterv = 5;//8
        this.curFloorLayerIndex = 0;//
        this.singleFloorPos = Laya.Vector3.ZERO;
        // 装备
        this.equipArr = 0;
        this.spaceArr = 0;
        //静止障碍块
        this.stillRiskMat = new Laya.PBRStandardMaterial();
        this.normalMat = new Laya.PBRStandardMaterial();
        this.stillRiskScale = new Laya.Vector3(1.01, 1.01, 1.01);
        //移动障碍
        this.moveRiskScale = new Laya.Vector3(1.005, 1.005, 1.005);
        //
        this.equipStarRotation = new Laya.Vector4(0, 0, 0, -1);
    }
    onAwake() {
        this.gameObj = this.owner;
        this.mainSceneObser = this.gameObj.parent.getComponent(GameMainScene).mainObserver;
        this.mainSceneObser.watch("creatFloor", this.floorInit.bind(this));
        this.stillRiskMat.albedoColor = new Laya.Vector4(1, 0, 0, 1);//红色
    }
    onStart() {
        //隐藏预制体
        for (const key in this.prefabArr) {
            this.prefabArr[key].active = false;
        }
        this.equipArr = this.prefabArr.concat();
        this.equipArr.splice(0, 1);
        this.floorInit(this.creatLayer);
    }
    //初始化
    floorInit(num) {
        //当前层数
        let floorIndex = 0;
        while (floorIndex < num) {
            //一层的总Floor
            let singleFloor = new Laya.Sprite3D();
            let randomData = this.getRandomData();//获取的json数据
            let baseBlock = this.createBaseBlock(randomData);
            let spBlock = this.creatSPBlock(randomData);
            singleFloor.addChild(baseBlock);
            singleFloor.addChild(spBlock);
            this.singleFloorPos.setValue(0, -this.curFloorLayerIndex * this.FloorInterv, 0);
            singleFloor.transform.translate(this.singleFloorPos, true);
            floorIndex++;
            this.curFloorLayerIndex++;
            this.gameObj.addChild(singleFloor);
        }
    }
    /**获取随机数据 */
    getRandomData() {
        let jsonData = Laya.loader.getRes("res/KHXM.json");
        let jsonArr = Object.keys(jsonData).map(key => jsonData[key]);
        let randomIndex = Math.floor(Math.random() * jsonArr.length);
        return jsonArr[randomIndex];
    }
    createBaseBlock(randomData) {
        let baseBlockObjs = new Laya.Sprite3D();
        this.spaceArr = [];
        let floorClone;
        for (let j = 0; j < randomData.base_block.length; j++) {
            let obj = randomData.base_block[j];
            if (obj) {
                floorClone = this.CloneObj(this.prefabArr[0], baseBlockObjs, GameMainScene.floorBarType.normal);
                if (!floorClone.getComponent(FloorBarManager)) {
                    floorClone.addComponent(FloorBarManager);
                    floorClone.getComponent(FloorBarManager).mainSceneObser = this.mainSceneObser;
                    floorClone.getComponent(FloorBarManager).floorBarPool = this.floorBarPool;
                }
                floorClone.meshRenderer.material = this.normalMat;
                if (obj === 2) {
                    floorClone.name = GameMainScene.floorBarType.stillObstacle;
                    //floorClone材质设置
                    floorClone.meshRenderer.material = this.stillRiskMat;
                    floorClone.transform.localScale = this.stillRiskScale;

                }
                //反转//todo
                //位置调整
                floorClone.transform.rotate(new Laya.Vector3(0, 0, (j * 22.5)), true, false);
                floorClone.active = true;
            }
            else {
                this.spaceArr.push(j);
            }
        }
        //随机添加道具
        if (this.creatEquipChance(1)) {//每一层出现道具的几率
            let ranEquip = this.ranElement(this.equipArr);
            let equipClone = this.CloneObj(ranEquip, baseBlockObjs, ranEquip.name);
            //随机位置
            let randomPos = this.ranElement(this.spaceArr);
            equipClone.transform.rotate(new Laya.Vector3(0, ((randomPos) * 22.5), 0), true, false);
            equipClone.active = true;
        }
        return baseBlockObjs;
    }
    creatSPBlock(randomData) {
        let spBlockObjs = new Laya.Sprite3D();
        for (let j = 0; j < randomData.sp_block_size.length; j++) {
            let obj = randomData.sp_block_size[j];
            if (obj) {
                let num = 0;
                while (num < obj) {
                    let floorClone = this.CloneObj(this.prefabArr[0], spBlockObjs, GameMainScene.floorBarType.abnormal);
                    if (!floorClone.getComponent(FloorBarManager)) {
                        floorClone.addComponent(FloorBarManager);
                        floorClone.getComponent(FloorBarManager).mainSceneObser = this.mainSceneObser;
                        floorClone.getComponent(FloorBarManager).floorBarPool = this.floorBarPool;
                        //添加标签
                        floorClone.name = GameMainScene.floorBarType.abnormal;
                        //floorClone材质设置
                        floorClone.meshRenderer.material = this.stillRiskMat;
                        floorClone.transform.localScale = this.moveRiskScale;
                    }
                    //速度
                    floorClone.getComponent(FloorBarManager).rotationData = randomData.sp_block_move_speed[j];
                    //起始位置
                    floorClone.transform.rotate(new Laya.Vector3(0, 0, (num * 22.5) + randomData.sp_block_start_pos[j] * 22.5), true, false);
                    //反转 todo
                    floorClone.active = true;
                    num++;
                }
            }
            return spBlockObjs;
        }
    }
    CloneObj(moudle, parent, name, doTrans = true) {
        let clone = this.floorBarPool.getItem(name);
        if (clone) {
            // if (!parent.getChildByName(clone.name)) {
            parent.addChild(clone);

        }
        else {
            clone = Laya.Sprite3D.instantiate(moudle, parent, false);
            clone.name = name;
        }
        if (doTrans) {
            clone.transform.position = moudle.transform.position;
            clone.transform.rotation = moudle.transform.rotation;
        }

        return clone;
    }
    ranElement(arr) {
        let randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
    //euqip creat probability
    creatEquipChance(pro) {
        return Math.random() < pro;
    }
}