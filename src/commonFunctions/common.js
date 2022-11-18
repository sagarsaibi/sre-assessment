"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.common = void 0;
const uuid_1 = require("uuid");
class Common {
    generateUUID() {
        let uuid = (0, uuid_1.v4)();
        console.log('Your UUID is: ' + uuid);
        return uuid;
    }
    generateRandomDesc() {
        let r = (Math.random() + 1).toString(36).substring(7);
        console.log("RANDOM STRING IS " + r);
        return r;
        //return (Math.random() + 1).toString(36).substring(10) //"asdlakfjda82a4668-59bd-44f6-8283-888c8029f3de";
    }
}
exports.common = new Common();
