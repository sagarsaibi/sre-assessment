export class Myclass{
    
    worldObject:any
    constructor(thisObject:any){
        this.worldObject = thisObject;
        console.log("Constructor for Myclass");
    }

    customMethod(thisObject:any){
        console.log("inside Myclass custom method")
        //thisObject.attach("THISOBJECT - LOG FROM CUSTOM METHOD FUNCTION FROM MYCLASS")
        this.worldObject.attach("LOG FROM CUSTOM METHOD FUNCTION FROM MYCLASS")
    }
}