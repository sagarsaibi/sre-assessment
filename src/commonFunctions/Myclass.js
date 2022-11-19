"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Myclass = void 0;
class Myclass {
    constructor(thisObject) {
        this.worldObject = thisObject;
        console.log("Constructor for Myclass");
    }
    customMethod(thisObject) {
        console.log("inside Myclass custom method");
        //thisObject.attach("THISOBJECT - LOG FROM CUSTOM METHOD FUNCTION FROM MYCLASS")
        this.worldObject.attach("LOG FROM CUSTOM METHOD FUNCTION FROM MYCLASS");
    }
}
exports.Myclass = Myclass;
