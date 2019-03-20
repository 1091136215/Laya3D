import ManManager from "./ManManager";
import FloorMoveManager from "./FloorMoveManager";
import FloorCreateManager from "./FloorCreateManager";
import CameraManager from "./CameraManager";
import Observer from "./Observer";
import CameraTransSet from "./CameraTransSet";
export default class GameMainScene extends Laya.Script3D {
    constructor() {
        super();
        // this.mainCamera = 0;
        // this.mainLight = 0;
        // this.man = 0;
        // this.floorBarPrefab = 0;
        // this.creatFloor = 0;
        this.mainObserver = new Observer();
    }
    onAwake() {
        this.scene = this.owner;
    }
    onStart() {
        var mainCamera = this.scene.getChildByName("Main Camera");
        mainCamera.addComponent(CameraManager);
        mainCamera.addComponent(CameraTransSet);
        var mainLight = this.scene.getChildByName("Directional Light");
        //地板块预制体
        var floorBarPrefab = this.scene.getChildByName("FloorBar");
        //空地板预制体
        var blankFloorPrefab = this.scene.getChildByName("BlankFloor");
        //地板(复合)
        var creatFloor = this.scene.getChildByName("FloorCreat");
        creatFloor.addComponent(FloorCreateManager).floorBarPrefab = floorBarPrefab;
        creatFloor.getComponent(FloorCreateManager).blankFloorPrefab = blankFloorPrefab;
      // creatFloor.addComponent(FloorMoveManager);
        //获取小球
        var man = this.scene.getChildByName("Man");
       man.addComponent(ManManager).floorContainer = creatFloor;
       man.getComponent(ManManager).camera = mainCamera;

    }
}
GameMainScene.floorBarType = {
    normal: "NORMAL",
    abnormal: "ABNORMAL",
    blank: "BLANK",
    stillObstacle: "STILLOBSTACLE"
}
