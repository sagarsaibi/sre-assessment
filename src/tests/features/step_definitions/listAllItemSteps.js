"use strict";
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
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
const list_1 = require("../../../commonFunctions/list");
const create_1 = require("../../../commonFunctions/create");
//Scenario: List items with ToDo list is empty
(0, cucumber_1.When)('User lists ToDo items', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.response = yield list_1.listItem.listAll(this);
    });
});
(0, cucumber_1.Then)('Empty list is displayed successfully', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(this.response.status()).toBe(200);
        let data = JSON.parse((yield this.response.body()).toString());
        console.log("DATAAAA - " + data);
        this.attach("List All API Response :");
        this.attach(JSON.stringify(data), 'application/json');
        (0, test_1.expect)(data.length).toBe(0);
    });
});
//Scenario: List items with ToDo list is has items
(0, cucumber_1.When)('User creates few items', function () {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 5; i++) {
            this.uuid = yield create_1.createItem.createRandomItem(this);
        }
    });
});
(0, cucumber_1.Then)('Item list is displayed successfully', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.response = yield list_1.listItem.listAll(this);
        (0, test_1.expect)(this.response.status()).toBe(200);
        let data = JSON.parse((yield this.response.body()).toString());
        this.attach("List All API Response :");
        this.attach(JSON.stringify(data), 'application/json');
        (0, test_1.expect)(data.length).toBeGreaterThan(0);
    });
});
