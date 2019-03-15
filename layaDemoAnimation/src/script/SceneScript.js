export default class SceneScript extends Laya.Script3D {
    constructor() {
        super();
        this.mainCamera = null;
        this.ray = 0;
        this.point = 0;
        this.rayCastHit = 0;
        this.circle = 0;
    }

    onAwake() {
        //this.scene = this.owner;
    }

    onStart() {
        this.ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
        this.point = new Laya.Vector2();
        this.circle = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(0.5, 100, 100));

        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.MouseDown);

    }
    MouseDown() {
        this.point.x = Laya.MouseManager.instance.mouseX;
        this.point.y = Laya.MouseManager.instance.mouseY;

        this.mainCamera.viewportPointToRay(this.point, this.ray);
        this.rayCastHit = new Laya.HitResult();
        this.owner.physicsSimulation.rayCast(this.ray, this.rayCastHit);

        if (this.rayCastHit.succeeded && this.rayCastHit.collider.owner.name !== "Plane") {
            //克隆一个货物模型
            var cloneCircle = Laya.Sprite3D.instantiate(this.circle);
            //给物体添加碰撞组件
            var meshCollider = cloneCircle.addComponent(Laya.PhysicsCollider);
            var cloneMesh = new Laya.BoxColliderShape(0.5, 0.5, 0.5);
            //给球添加刚体
            var sphereRigid = cloneCircle.addComponent(Laya.Rigidbody3D);
            //将碰撞盒添加到刚体上
            sphereRigid.colliderShape = cloneMesh;

            this.owner.addChild(cloneCircle);
            cloneCircle.transform.position = this.rayCastHit.point;
        }
    }

}