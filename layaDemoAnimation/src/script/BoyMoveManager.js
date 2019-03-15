export default class BoyMoveManager extends Laya.Script3D {
    constructor() {
        super();
        this.boyAni = 0;
        this.speed=0.02;
    }
    onAwake() {
        this.obj = this.owner;

    }
    onStart() {
        this.boyAni = this.obj.getComponent(Laya.Animator);
    }
    onKeyDown(e) {
        switch (e.keyCode) {
            case 37:
                this.owner.transform.translate(new Laya.Vector3(this.speed, 0, 0), false);
                break;
            case 38:
                this.owner.transform.translate(new Laya.Vector3(0, 0, this.speed), false);
                break;
            case 39:
                this.owner.transform.translate(new Laya.Vector3(-this.speed, 0, 0), false);
                break;
            case 40:
                this.owner.transform.translate(new Laya.Vector3(0, 0, -this.speed), false);
                break;
            case 32:
                this.owner.transform.translate(new Laya.Vector3(0, this.speed, 0), false);
                break;
            default:
                return;
                break;
        }
    }
}