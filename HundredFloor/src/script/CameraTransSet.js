export default class CameraTransSet extends Laya.Script3D {

    constructor() {
        super();
        // this.startPos = new Laya.Vector3(0, -5.15, -1.19);
        // this.startRotation = new Laya.Vector4(0.03397365063332456, -0.0206223826428884, -0.854162119843573, -0.5184858546007872);

    }
    onAwake() {
        this.camera = this.owner;
        //  this.setPosAndRotation(true, this.startPos, this.startRotation);
    }
    setPosAndRotation(isInit, pos, rotation, rotate) {
        if (pos) {
            var posInfo = {
                curPos: this.camera.transform.position,
                changePos: pos
            }
            if (isInit) {
                this.camera.transform.position = posInfo.changePos;
            }
            else {
                let finalPos = new Laya.Vector3(0, 0, 0);
                Laya.Vector3.add(posInfo.curPos, posInfo.changePos, finalPos);
                this.camera.transform.position = finalPos;
            }
        }
        if (rotation) {
            var rotationInfo = {
                curRotation: this.camera.transform.rotation,
                changeRotation: rotation
            }
            if (isInit) {
                this.camera.transform.rotation = rotationInfo.changeRotation;
            }
            else {
                let finalRotation = new Laya.Vector4(0, 0, 0, 0);
                Laya.Vector4.add(rotationInfo.changeRotation, rotationInfo.curRotation, finalRotation);
                this.camera.transform.rotation = finalRotation;
            }
        }
        if (rotate) {
            this.camera.transform.rotate(rotate);
        }


    }
}