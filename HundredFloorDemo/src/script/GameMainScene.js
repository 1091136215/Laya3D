import ManManager from "./ManManager";
import FloorMoveManager from "./FloorMoveManager";
import FloorCreateManager from "./FloorCreateManager";
export default class GameMainScene extends Laya.Script3D {
    constructor() {
        super();
        // this.mainCamera = 0;
        // this.mainLight = 0;
        // this.man = 0;
        // this.floorBarPrefab = 0;
        // this.creatFloor = 0;
    }
    onAwake() {
        this.scene = this.owner;
    }
    onStart() {
        var mainCamera = this.scene.getChildByName("Main Camera");
        var mainLight = this.scene.getChildByName("Directional Light");
        //获取小球
        var man = this.scene.getChildByName("Man");
        man.addComponent(ManManager);
        //地板块预制体
        var floorBarPrefab = this.scene.getChildByName("FloorBar");
        //地板(复合)
        var creatFloor = this.scene.getChildByName("FloorCreat");
        creatFloor.addComponent(FloorCreateManager).floorBarPrefab = floorBarPrefab;
        creatFloor.addComponent(FloorMoveManager);
    }
}