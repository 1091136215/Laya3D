import BoyMoveManager from "./BoyMoveManager";
import CubeManager from "./CubeManager";
import SceneScript from "./SceneScript";

export default class MainScene{
    constructor() {
        this.scene = 0;
        this.boy = 0;
        //预加载所有资源
        var resource = [
            { url: "LayaScene_SampleScene/Conventional/SampleScene.ls", type: Laya3D.HIERARCHY, priority: 1 },
        ]
        Laya.loader.create(resource,Laya.Handler.create(this,this.onLoadFinish));
    }
    onLoadFinish() {
        this.scene = Laya.Loader.getRes("LayaScene_SampleScene/Conventional/SampleScene.ls");
        Laya.stage.addChild(this.scene);
        var camera = this.scene.getChildByName("Main Camera");
        //给场景添加脚本
        this.scene.addComponent(SceneScript);
        this.scene.getComponent(SceneScript).mainCamera = camera;
        MainScene.prototype.cameraSet(camera, this.scene);
        var light2 = this.scene.getChildByName("Directional Light");
        MainScene.prototype.lightSet(light2);
        //获取方块和平面
        var cube = this.scene.getChildByName("Cube");
        var cubeScript = cube.addComponent(CubeManager);
        // cube.getComponent(CubeManager).destroy();
        //碰撞组
        //cube.getComponent(Laya.Rigidbody3D).collisionGroup=Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;
        // console.log(cube.getComponent(Laya.Rigidbody3D).canCollideWith)
        // console.log(cube_1.getComponent(Laya.PhysicsCollider).canCollideWith);
        var cube_1 = this.scene.getChildByName("Cube_1");
        var cube_2 = this.scene.getChildByName("Cube_2");
        var plane = this.scene.getChildByName("Plane");
        var Key = this.scene.getChildByName("Key");
        cubeScript.cube_1 = cube_1;
        cubeScript.cube_2 = cube_2;
        //plane.getComponent(Laya.PhysicsCollider).canCollideWith=Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER10;
        var vect = new Laya.Vector3(0, 1, 0);
        //产生阴影
        cube.meshRenderer.castShadow = true;
        cube_1.meshRenderer.castShadow = true;
        plane.meshRenderer.receiveShadow = true;
        //男孩
        this.boy=this.scene.getChildByName("BoyModule");
        this.boy.addComponent(BoyMoveManager);
        this.boy.castShadow = true;
    }
    lightSet(light2) {
        //添加灯光投影
        light2.shadow = true;
        //产生投影范围
        light2.shadowDistance = 45;
        //生成阴影的贴图数量
        light2.shadowPSSMCount = 1;
        //模糊等级，越大越高，效果更好，更耗性能
        light2.shadowPCFType = 1;
        //投影质量
        light2.shadowResolution = 2048;
    }
    cameraSet(camera, scene) {

        var exposureNumber = 0;
        camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
        //"LayaScene_SampleScene/Conventional/Assets/Material/skybox.mat"
        //"https://layaair.ldc.layabox.com/demo2/h5/res/threeDimen/skyBox/DawnDusk/SkyBox.lmat"
        Laya.BaseMaterial.load("https://layaair.ldc.layabox.com/demo2/h5/res/threeDimen/skyBox/DawnDusk/SkyBox.lmat", Laya.Handler.create(this, (mat) => {
            camera.skyRenderer.mesh = Laya.SkyBox.instance;
            camera.skyRenderer.material = mat;
            Laya.timer.frameLoop(1, this, () => {
                camera.skyRenderer.material.exposure = Math.sin(exposureNumber += 0.01) + 1;
                camera.skyRenderer.material.rotation += 0.01;
            });
        }));
    }
}