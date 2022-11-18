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
const update_1 = require("../../../commonFunctions/update");
let response;
let uuid = "";
let updated_desc = "Modified Description";
let status_complete = true;
let status_incomplete = false;
let currentStatus = false;
//Scenario: User is able to update description of ToDo item
(0, cucumber_1.Given)('When the list has items to update', function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Given");
        uuid = yield create_1.createItem.createRandomItem();
        console.log("Create item with id   " + uuid);
    });
});
(0, cucumber_1.When)('User updates description of the items', function () {
    return __awaiter(this, void 0, void 0, function* () {
        //uuid = "72be6b1a-166d-4669-bdf9-ce182f0192b0"
        console.log("When - Generating UUID " + uuid);
        response = yield list_1.listItem.listItem(uuid);
        let data = JSON.parse((yield response.body()).toString());
        (0, test_1.expect)(response.status()).toBe(200);
        response = yield update_1.updateItem.updateDecription(uuid, updated_desc, data.isCompleted);
        console.log("Response THEN ID - " + JSON.stringify(response));
    });
});
(0, cucumber_1.Then)('Item description is updated successfully', function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Then");
        (0, test_1.expect)(response.status()).toBe(204);
        response = yield list_1.listItem.listItem(uuid);
        console.log("Response THEN ID - " + JSON.stringify(response));
        let data = JSON.parse((yield response.body()).toString());
        (0, test_1.expect)(response.status()).toBe(200);
        (0, test_1.expect)(data.id).toEqual(uuid);
        console.log("UPDATED DESCRIPTION - " + data.description);
        (0, test_1.expect)(data.description).toEqual(updated_desc);
    });
});
//Scenario: User is able to update status of and item
(0, cucumber_1.When)('User updates status of the items', function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("When");
        console.log("When - Generating UUID " + uuid);
        response = yield list_1.listItem.listItem(uuid);
        let data = JSON.parse((yield response.body()).toString());
        (0, test_1.expect)(response.status()).toBe(200);
        currentStatus = data.isCompleted;
        console.log("CURRENT STATUS IS " + currentStatus);
        if (currentStatus) {
            response = yield update_1.updateItem.updateStatus(uuid, status_incomplete);
        }
        else {
            response = yield update_1.updateItem.updateStatus(uuid, status_complete);
        }
        console.log("Response THEN ID - " + JSON.stringify(response));
    });
});
(0, cucumber_1.Then)('Item status is updated successfully', function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Then");
        (0, test_1.expect)(response.status()).toBe(204);
        response = yield list_1.listItem.listItem(uuid);
        let data = JSON.parse((yield response.body()).toString());
        console.log("UPDATED STATUS  - " + JSON.stringify(data));
        (0, test_1.expect)(response.status()).toBe(200);
        (0, test_1.expect)(data.id).toEqual(uuid);
        console.log("UPDATED Status - " + JSON.stringify(data.isCompleted));
        if (currentStatus) {
            (0, test_1.expect)(data.isCompleted).toEqual(status_incomplete);
        }
        else {
            (0, test_1.expect)(data.isCompleted).toEqual(status_complete);
        }
    });
});
//Scenario: User is able to update description of already completed item
(0, cucumber_1.Given)('When user creates an item and marks it complete', function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Given");
        uuid = yield create_1.createItem.createRandomItem();
        console.log("Create item with id   " + uuid);
        response = yield update_1.updateItem.updateStatus(uuid, status_complete);
        response = yield list_1.listItem.listItem(uuid);
        let data = JSON.parse((yield response.body()).toString());
        (0, test_1.expect)(response.status()).toBe(200);
        (0, test_1.expect)(data.id).toEqual(uuid);
        console.log("GIVEN UPDATED Status - " + JSON.stringify(data.isCompleted));
        (0, test_1.expect)(data.isCompleted).toEqual(status_complete);
    });
});
//Scenario: User is able to update status of already completed item
