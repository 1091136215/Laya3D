export default class CubeManager extends Laya.Script3D {
    constructor() {
        super();
        this.direction = new Laya.Vector3(0, 0, 0);
        this.speed = 5 * 0.017;
        this.cube_1 = 0;
        this.cube_2 = 0;
        //方块初始位置
        this.cube1StatPos = 0;
        this.cube2StatPos = 0;
        //移动值
        this.moveValue = 2;
        //刚体
        this.cubeRig = 0;
    }
    onAwake() {
        //  this.scene = this.owner;
    }

    onStart() {
        this.cube1StatPos = this.cube_1.transform.position;
        this.cube2StatPos = this.cube_2.transform.position;
        this.cubeRig = this.owner.getComponent(Laya.Rigidbody3D);
        //添加一个重量
        this.cubeRig.mass = 10;
        //添加弹力
        this.cubeRig.restitution = 1;
        //添加滚动摩擦力
        this.cubeRig.rollingFriction = 0.5
    }
    onTriggerEnter(other) {
        if (other.owner.name === "Key") {
            this.cube1StatPos.x -= this.moveValue;
            //this.cube2StatPos.x += this.moveValue;
            this.cube_1.transform.position = this.cube1StatPos;
            // this.cube_2.transform.position = this.cube2StatPos;
        }
    }
    onTriggerExit(other) {
        if (other.owner.name === "Key") {
            this.cube1StatPos.x += this.moveValue;
            //this.cube2StatPos.x -= this.moveValue;
            this.cube_1.transform.position = this.cube1StatPos;
            // this.cube_2.transform.position = this.cube2StatPos;
        }
    }



}