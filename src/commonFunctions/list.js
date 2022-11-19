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
exports.listItem = void 0;
const cucumber_conf_1 = require("../../cucumber.conf");
const test_1 = require("@playwright/test");
const URI = __importStar(require("../support/URI_CONSTANTS"));
const update_1 = require("./update");
let response;
class List {
    constructor() {
        console.log("Constructor for List");
    }
    /**
    * Function to calculate count of items in the list
    * @returns count of the items in the list
    */
    getCurrentListCount(worldObject) {
        return __awaiter(this, void 0, void 0, function* () {
            worldObject.attach("Calling API - " + URI.LIST_TODO_LIST);
            response = yield cucumber_conf_1.context.get(URI.LIST_TODO_LIST);
            (0, test_1.expect)(response.ok()).toBeTruthy();
            (0, test_1.expect)(response.status()).toBe(200);
            let data = JSON.parse((yield response.body()).toString());
            worldObject.attach("Current list count is " + data.length);
            return data.length;
        });
    }
    /**
    * Marks all items in the list as completed
    *
    */
    emptyList(worldObject) {
        return __awaiter(this, void 0, void 0, function* () {
            worldObject.attach("Calling API - " + URI.LIST_TODO_LIST);
            response = yield cucumber_conf_1.context.get(URI.LIST_TODO_LIST);
            //console.log("Response THEN - " + JSON.stringify(response))
            (0, test_1.expect)(response.ok()).toBeTruthy();
            (0, test_1.expect)(response.status()).toBe(200);
            let data = JSON.parse((yield response.body()).toString());
            worldObject.attach("Current list count is " + data.length);
            if (data.length > 0) {
                worldObject.attach("List contains " + data.length + " objects");
                data.forEach(function (obj) {
                    worldObject.attach("Marking object complete - " + JSON.stringify(obj));
                    obj.isCompleted = true;
                    update_1.updateItem.markComplete(worldObject, obj);
                });
            }
            else {
                worldObject.attach("List is empty");
            }
        });
    }
    /**
    * Lists items for a given ID
    * @returns the item with specified ID
    */
    listItem(worldObject, itemID) {
        return __awaiter(this, void 0, void 0, function* () {
            worldObject.attach("Listing item with id " + itemID);
            worldObject.attach("API - " + URI.LIST_TODO_ITEM + itemID);
            response = yield cucumber_conf_1.context.get(URI.LIST_TODO_ITEM + itemID);
            return response;
        });
    }
    /**
    * Lists all items
    * @returns the list of item
    */
    listAll(worldObject) {
        return __awaiter(this, void 0, void 0, function* () {
            worldObject.attach("Listing All items");
            worldObject.attach("API - " + URI.LIST_TODO_LIST);
            response = yield cucumber_conf_1.context.get(URI.LIST_TODO_LIST);
            return response;
        });
    }
}
exports.listItem = new List();
