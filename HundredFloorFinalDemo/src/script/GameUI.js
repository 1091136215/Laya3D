import GameMainScene from "./GameMainScene";

/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI extends Laya.Scene {
    constructor() {
        super();
        //加载场景文件
        this.loadScene("test/TestScene.scene");
        var resource = [
            { url: "LayaScene_SampleScene/Conventional/SampleScene.ls", type: Laya3D.HIERARCHY, priority: 1 },
        ]
        //预加载unity场景
        Laya.loader.create(resource, Laya.Handler.create(this, this.onLoadFinish));
        //预加载json
        Laya.loader.load("res/KHXM.json", null, null, Laya.Loader.JSON, 0);
        Laya.Texture2D.load("res/2X_qiuti.png")
        Laya.Texture2D.load("res/fudun_qiuti.png")
        Laya.Texture2D.load("res/huojian_qiuti.png")
    }
    onLoadFinish() {
        var fightScene = Laya.Loader.getRes("LayaScene_SampleScene/Conventional/SampleScene.ls");
        Laya.stage.addChildAt(fightScene, 0);
        fightScene.addComponent(GameMainScene);
    }

}