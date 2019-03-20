import GameMainScene from "./GameMainScene";
import FloorBarManager from "./FloorBarManager";
import GamePool from "./GamePool";

export default class FloorCreateManager extends Laya.Script3D {
    constructor() {
        super();
        //观察者
        this.mainSceneObser = 0;
        //对象池
        this.floorBarPool = new GamePool();
        this.floorBarPrefab = 0;
        this.blankFloorPrefab = 0;
        //一次性生产Floor层数
        this.creatLayer = 4;
        //每层之间的间隔y值
        this.FloorInterv = 8;
        this.curFloorLayerIndex = 0;//
    }
    onAwake() {
        this.gameObj = this.owner;
        this.mainSceneObser = this.gameObj.parent.getComponent(GameMainScene).mainObserver;
        this.mainSceneObser.watch("creatFloor", this.floorInit.bind(this));
    }
    onEnable() {

    }
    onStart() {
        //隐藏预制体
        this.floorBarPrefab.active = false;
        this.blankFloorPrefab.active = false;
        this.floorInit(this.creatLayer);
    }
    onUpdate() {

    }
    //初始化
    floorInit(num) {
        //当前层数
        var floorIndex = 0;
        while (floorIndex < num) {
            //一层的总Floor
            var singleFloor = new Laya.Sprite3D();
            var randomData = this.getRandomData();
            var baseBlock = this.createBaseBlock(randomData);
            var spBlock = this.creatSPBlock(randomData);
            singleFloor.addChild(baseBlock);
            singleFloor.addChild(spBlock);
            // 一层的blank
            var blankFloorClone = Laya.Sprite3D.instantiate(this.blankFloorPrefab, singleFloor, false);
            blankFloorClone.name = GameMainScene.floorBarType.blank;
            blankFloorClone.active = true;

            singleFloor.transform.translate(new Laya.Vector3(0, -this.curFloorLayerIndex * this.FloorInterv, 0), true)
            floorIndex++;
            this.curFloorLayerIndex++;
            this.gameObj.addChild(singleFloor);
        }
    }
    /**获取随机数据 */
    getRandomData() {
        var jsonData = Laya.loader.getRes("res/KHXM.json");
        var jsonArr = Object.keys(jsonData).map(key => jsonData[key]);
        var randomIndex = Math.floor(Math.random() * jsonArr.length);
        return jsonArr[randomIndex];
    }
    createBaseBlock(randomData) {
        var baseBlockObjs = new Laya.Sprite3D();
        if (!randomData.base_block instanceof Array) return;
        for (let j = 0; j < randomData.base_block.length; j++) {
            let obj = randomData.base_block[j];
            if (obj) {
                var floorClone;
                var floorClone = this.floorBarPool.getItem(GameMainScene.floorBarType.normal);
                if (!floorClone) {
                    floorClone = Laya.Sprite3D.instantiate(this.floorBarPrefab, baseBlockObjs, false);
                }
                else {
                    baseBlockObjs.addChild(floorClone);
                    floorClone.transform.position = this.floorBarPrefab.transform.position;
                    floorClone.transform.rotation = this.floorBarPrefab.transform.rotation;
                }
                if (!floorClone.getComponent(FloorBarManager)) {
                    floorClone.addComponent(FloorBarManager);
                    floorClone.getComponent(FloorBarManager).mainSceneObser = this.mainSceneObser;
                    floorClone.getComponent(FloorBarManager).floorBarPool = this.floorBarPool;
                    floorClone.name = GameMainScene.floorBarType.normal;
                    if (obj === 2) {
                        floorClone.name = GameMainScene.floorBarType.stillObstacle;
                        //floorClone材质设置
                        floorClone.meshRenderer.material.albedoColor = new Laya.Vector4(1, 0, 0, 1);
                    }
                }
                //位置调整
                floorClone.transform.rotate(new Laya.Vector3(0, 0, (j * 22.5)), true, false);
                //反转//todo
                if (randomData.reversal) {
                    // floorClone.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
                    // floorClone.transform.translate(new Laya.Vector3(2, 0, 0));
                }
                floorClone.active = true;
            }
        }
        return baseBlockObjs;
    }
    creatSPBlock(randomData) {
        var spBlockObjs = new Laya.Sprite3D();
        if (!randomData.sp_block_size instanceof Array) return;
        for (let j = 0; j < randomData.sp_block_size.length; j++) {
            let obj = randomData.sp_block_size[j];
            if (obj) {
                let num = 0;
                while (num < obj) {
                    var floorClone;
                    floorClone = this.floorBarPool.getItem(GameMainScene.floorBarType.abnormal);
                    if (!floorClone) {
                        floorClone = Laya.Sprite3D.instantiate(this.floorBarPrefab, spBlockObjs, false);
                    }
                    else {
                        spBlockObjs.addChild(floorClone);
                        floorClone.transform.position = this.floorBarPrefab.transform.position;
                        floorClone.transform.rotation = this.floorBarPrefab.transform.rotation;
                    }
                    if (!floorClone.getComponent(FloorBarManager)) {
                        //速度
                        floorClone.addComponent(FloorBarManager).rotationData = randomData.sp_block_move_speed[j];
                        floorClone.getComponent(FloorBarManager).mainSceneObser = this.mainSceneObser;
                        floorClone.getComponent(FloorBarManager).floorBarPool = this.floorBarPool;
                        //添加标签
                        floorClone.name = GameMainScene.floorBarType.abnormal;
                        //floorClone材质设置
                        floorClone.meshRenderer.material.albedoColor = new Laya.Vector4(1, 0, 0, 1);
                        floorClone.transform.localScale = new Laya.Vector3(1.005, 1.005, 1.005);
                    }
                    //起始位置
                    floorClone.transform.rotate(new Laya.Vector3(0, 0, (num * 22.5) + randomData.sp_block_start_pos[j] * 22.5), true, false);
                    //反转//todo
                    // if (randomData.reversal) {
                    //     floorClone.transform.rotate(new Laya.Vector3(0, 0, 180), true, false);
                    //     floorClone.transform.translate(new Laya.Vector3(2, 0, 0));
                    // }
                    floorClone.active = true;
                    num++;
                }
            }
            return spBlockObjs;
        }
    }

}