export default class FloorCreateManager extends Laya.Script3D {
    constructor() {
        super();
        this.floorBarPrefab = 0;
        //一次性生产Floor层数
        this.creatLayer = 1;
        //每层之间的间隔
        this.FloorInterv = 30;
    }
    onAwake() {
        this.gameObj = this.owner;
    }
    onEnable() {

    }
    onStart() {
        this.floorInit();
    }
    onUpdate() {

    }
    //初始化
    floorInit() {
        //当前层数
        var curLayerindex = 0;
        while (curLayerindex < this.creatLayer) {
            //一层的Floor
            var singleFloor = new Laya.Sprite3D();
            var randomData = this.getRandomData();
            var baseBlock = this.createBaseBlock(randomData);
            var spBlock = this.creatSPBlock(randomData);
            singleFloor.addChildren(baseBlock, spBlock);
            var singleFloorPos = singleFloor.transform.position;
            singleFloorPos.y+=this.FloorInterv;
            // singleFloor.transform.translate()
            this.gameObj.addChild(singleFloor);
            curLayerindex++;
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
                var floorClone = Laya.Sprite3D.instantiate(this.floorBarPrefab, baseBlockObjs, false);
                floorClone.transform.rotate(new Laya.Vector3(0, 0, (j * 22.5)), true, false);
                //反转
                if (randomData.reversal) {
                    // floorClone.transform.rotate(new Laya.Vector3(0,0,180 ), true, false);
                    // floorClone.transform.translate(new Laya.Vector3(2,0,0));
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
                    var floorClone = Laya.Sprite3D.instantiate(this.floorBarPrefab, spBlockObjs, false);
                    floorClone.transform.rotate(new Laya.Vector3(0, 0, (num * 22.5)), true, false);
                    //floorClone材质设置
                    floorClone.meshRenderer.material.albedoColor = new Laya.Vector4(0.5, 0.5, 0.5,1);
                    //添加标签
                    floorClone.name = "SP";
                    floorClone.active = true;
                    //起始位置
                    floorClone.transform.rotate(new Laya.Vector3(0, 0, randomData.sp_block_start_pos[j] * 22.5), true, false);
                    //速度
                    //randomData.sp_block_move_speed
                    num++;
                }
            }
            return spBlockObjs;
        }
    }

}
FloorCreateManager.BAR_TOGETHER_NUM = 16;