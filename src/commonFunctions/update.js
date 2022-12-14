"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItem = void 0;
const cucumber_conf_1 = require("../../cucumber.conf");
const URI = __importStar(require("../support/URI_CONSTANTS"));
let response;
class Update {
    constructor() {
        console.log("Constructor called for update");
    }
    /**
    * Mark item as completed for a specified ID
    *
    */
    markComplete(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log("Calling mark complete  " + JSON.stringify(obj))
            response = yield cucumber_conf_1.context.put(URI.UPDATE_TODO_ITEM + obj.id, {
                data: {
                    "id": obj.id,
                    "description": obj.description,
                    "isCompleted": obj.isCompleted
                },
            });
        });
    }
    /**
    * Update description to a specified value for the item with specified ID
    * @returns the reponse of PUT API call
    */
    updateDecription(id, desc, status) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Modifying object with ID  " + id);
            console.log("Updating description to   " + desc);
            response = yield cucumber_conf_1.context.put(URI.UPDATE_TODO_ITEM + id, {
                data: {
                    "id": id,
                    "description": desc,
                    "isCompleted": status
                },
            });
            return response;
        });
    }
    /**
    * Update status to a specified status for the item with specified ID
    * @returns the reponse of PUT API call
    */
    updateStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Modifying object with ID  " + id);
            console.log("Updating status to   " + status);
            response = yield cucumber_conf_1.context.put(URI.UPDATE_TODO_ITEM + id, {
                data: {
                    "id": id,
                    "description": "desc",
                    "isCompleted": status
                },
            });
            return response;
        });
    }
}
exports.updateItem = new Update();
