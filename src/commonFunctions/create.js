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
exports.createItem = void 0;
const cucumber_conf_1 = require("../../cucumber.conf");
const test_1 = require("@playwright/test");
const URI = __importStar(require("../support/URI_CONSTANTS"));
const common_1 = require("../commonFunctions/common");
let response;
class Create {
    constructor() {
        console.log("Constructor for Create");
    }
    /**
    * Create randome todo item
    * @returns ID of the Item created
    */
    createRandomItem() {
        return __awaiter(this, void 0, void 0, function* () {
            response = yield cucumber_conf_1.context.post(URI.CREATE_TODO_ITEM, {
                data: {
                    "description": common_1.common.generateRandomDesc(),
                },
            });
            //Item creation successful
            (0, test_1.expect)(response.ok()).toBeTruthy();
            (0, test_1.expect)(response.status()).toBe(201);
            let data = JSON.parse((yield response.body()).toString());
            return data;
        });
    }
    /**
    * Create items with specified description
    * @returns reponse of the POST API call to create item
    */
    createItemWithDesc(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            response = yield cucumber_conf_1.context.post(URI.CREATE_TODO_ITEM, {
                data: {
                    "description": desc,
                },
            });
            return response;
        });
    }
    /**
    * Create item without any description
    * @returns reponse of the POST API call to create item
    */
    createItemWithoutDesc() {
        return __awaiter(this, void 0, void 0, function* () {
            response = yield cucumber_conf_1.context.post(URI.CREATE_TODO_ITEM, {
                data: {
                    "description": "",
                },
            });
            return response;
        });
    }
}
exports.createItem = new Create();
