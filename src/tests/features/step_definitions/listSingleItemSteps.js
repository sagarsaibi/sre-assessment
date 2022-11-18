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
const common_1 = require("../../../commonFunctions/common");
const list_1 = require("../../../commonFunctions/list");
const create_1 = require("../../../commonFunctions/create");
let response;
let uuid = "";
//Scenario: List items when ToDo list is empty
(0, cucumber_1.Given)('When the list is empty', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield list_1.listItem.emptyList();
    });
});
(0, cucumber_1.When)('User lists ToDo items with ID', function () {
    return __awaiter(this, void 0, void 0, function* () {
        uuid = common_1.common.generateUUID();
        response = yield list_1.listItem.listItem(uuid);
    });
});
(0, cucumber_1.Then)('Error message is displayed', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(response.status()).toBe(404);
        let resString = (yield response.body()).toString();
        (0, test_1.expect)(resString).toEqual("Todo item with id " + uuid + " not found");
    });
});
//Scenario: List items with ToDO list has items
(0, cucumber_1.Given)('When the list has items', function () {
    return __awaiter(this, void 0, void 0, function* () {
        uuid = yield create_1.createItem.createRandomItem();
    });
});
(0, cucumber_1.When)('User lists ToDo items with ID from list', function () {
    return __awaiter(this, void 0, void 0, function* () {
        //uuid = "72be6b1a-166d-4669-bdf9-ce182f0192b0"
        response = yield list_1.listItem.listItem(uuid);
    });
});
(0, cucumber_1.Then)('Item is displayed with success', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let data = JSON.parse((yield response.body()).toString());
        (0, test_1.expect)(response.status()).toBe(200);
        (0, test_1.expect)(data.id).toEqual(uuid);
    });
});
//Scenario: List items with incorrect ID
(0, cucumber_1.When)('User lists ToDo items with wrong ID', function () {
    return __awaiter(this, void 0, void 0, function* () {
        uuid = "72be6b1a-166d-4669-bdf9-ce182f0192b0";
        response = yield list_1.listItem.listItem(uuid);
    });
});
(0, cucumber_1.Then)('Error message is displayed for wrong ID', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(response.status()).toBe(404);
        let resString = (yield response.body()).toString();
        (0, test_1.expect)(resString).toEqual("Todo item with id " + uuid + " not found");
    });
});
