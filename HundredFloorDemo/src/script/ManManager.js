export default class ManManager extends Laya.Script3D{
    constructor(){
        super();
        this.manStatus=0;
        this.manSpeed=0;
        this.manRigby=0;
    }
    onAwake(){
        this.gameObj=this.owner;
    }
    onStart(){
        this.manRigby=this.gameObj.getComponent(Laya.Rigidbody3D);

    }
    onUpdate(){

    }
    ManMove(){
        
    }
}