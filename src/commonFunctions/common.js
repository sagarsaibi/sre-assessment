"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.common = void 0;
const uuid_1 = require("uuid");
class Common {
    /**
    * Generate UUID to fetch non created item
    * @returns UUID of version 4
    *
    */
    generateUUID() {
        return (0, uuid_1.v4)();
    }
    /**
    * Generate random description string to create items
    * @returns a string of seven characters
    */
    generateRandomDesc() {
        return (Math.random() + 1).toString(36).substring(7);
    }
}
exports.common = new Common();
