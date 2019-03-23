import ManManager from "./ManManager";
import FloorMoveManager from "./FloorMoveManager";
import FloorCreateManager from "./FloorCreateManager";
import CameraManager from "./CameraManager";
import Observer from "./Observer";
import CameraTransSet from "./CameraTransSet";
export default class GameMainScene extends Laya.Script3D {
    constructor() {
        super();
        this.mainObserver = new Observer();
    }
    onAwake() {
        this.scene = this.owner;
    }
    onStart() {
        var mainCamera = this.scene.getChildByName("Main Camera");
        //mainCamera.addComponent(CameraManager);
        //mainCamera.addComponent(CameraTransSet);
        var mainLight = this.scene.getChildByName("Directional Light");
        var doublePrefab = this.scene.getChildByName("DOUBLEMARK");
        var defence = this.scene.getChildByName("DEFENCE");
        var rocket = this.scene.getChildByName("ROCKET");
        //地板预制体
        var floorBarPrefab = this.scene.getChildByName("FloorBar");
        // //空地板预制体
        // var blankFloorPrefab = this.scene.getChildByName("BlankFloor");
        //地板容器
        var creatFloor = this.scene.getChildByName("FloorCreat");
        var prefabArr = [floorBarPrefab, doublePrefab, defence, rocket];
        creatFloor.addComponent(FloorCreateManager).prefabArr = prefabArr;
        creatFloor.addComponent(FloorMoveManager);
        //撞击特效模型
        var landColliEft = this.scene.getChildByName("LandColliEft");
        //获取小球
        var man = this.scene.getChildByName("Man");
        man.addComponent(ManManager).floorContainer = creatFloor;
        var manScript = man.getComponent(ManManager);
        manScript.camera = mainCamera;
        manScript.landColliEft = landColliEft;

    }
}
GameMainScene.floorBarType = {
    normal: "NORMAL",
    abnormal: "ABNORMAL",
    stillObstacle: "STILLOBSTACLE",
    doubleMark: "DOUBLEMARK",
    defence: "DEFENCE",
    rocket: "ROCKET"

}
