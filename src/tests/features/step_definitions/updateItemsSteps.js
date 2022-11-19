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
let updated_desc = "Modified Description";
let status_complete = true;
let status_incomplete = false;
let currentStatus = false;
//Scenario: User is able to update description of ToDo item
(0, cucumber_1.Given)('When the list has items to update', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.uuid = yield create_1.createItem.createRandomItem(this);
        this.attach("Generated random UUID " + this.uuid + " to list");
    });
});
(0, cucumber_1.When)('User updates description of the items', function () {
    return __awaiter(this, void 0, void 0, function* () {
        //uuid = "72be6b1a-166d-4669-bdf9-ce182f0192b0"
        this.attach("Listing item with UUID " + this.uuid);
        this.response = yield list_1.listItem.listItem(this, this.uuid);
        let data = JSON.parse((yield this.response.body()).toString());
        this.attach("List Item API Response :");
        this.attach(JSON.stringify(data), 'application/json');
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 200");
        (0, test_1.expect)(this.response.status()).toBe(200);
        this.attach("Updating description of Item");
        this.response = yield update_1.updateItem.updateDecription(this, this.uuid, updated_desc, data.isCompleted);
    });
});
(0, cucumber_1.Then)('Item description is updated successfully', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 204");
        (0, test_1.expect)(this.response.status()).toBe(204);
        this.attach("Update successful");
        this.attach("Update API Response :");
        this.attach("Listing item with UUID " + this.uuid);
        this.response = yield list_1.listItem.listItem(this, this.uuid);
        let data = JSON.parse((yield this.response.body()).toString());
        this.attach("List Item API Response :");
        this.attach(JSON.stringify(data), 'application/json');
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 200");
        (0, test_1.expect)(this.response.status()).toBe(200);
        (0, test_1.expect)(data.id).toEqual(this.uuid);
        (0, test_1.expect)(data.description).toEqual(updated_desc);
    });
});
//Scenario: User is able to update status of and item
(0, cucumber_1.When)('User updates status of the items', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.response = yield list_1.listItem.listItem(this, this.uuid);
        let data = JSON.parse((yield this.response.body()).toString());
        this.attach("List Item API Response :");
        this.attach(JSON.stringify(data), 'application/json');
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 200");
        (0, test_1.expect)(this.response.status()).toBe(200);
        currentStatus = data.isCompleted;
        if (currentStatus) {
            this.response = yield update_1.updateItem.updateStatus(this, this.uuid, status_incomplete);
        }
        else {
            this.response = yield update_1.updateItem.updateStatus(this, this.uuid, status_complete);
        }
    });
});
(0, cucumber_1.Then)('Item status is updated successfully', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 204");
        (0, test_1.expect)(this.response.status()).toBe(204);
        this.response = yield list_1.listItem.listItem(this, this.uuid);
        let data = JSON.parse((yield this.response.body()).toString());
        this.attach("List API Response :");
        this.attach(JSON.stringify(data), 'application/json');
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 200");
        (0, test_1.expect)(this.response.status()).toBe(200);
        (0, test_1.expect)(data.id).toEqual(this.uuid);
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
        this.uuid = yield create_1.createItem.createRandomItem(this);
        this.attach("Generated random UUID " + this.uuid + " to list");
        this.response = yield update_1.updateItem.updateStatus(this, this.uuid, status_complete);
        this.response = yield list_1.listItem.listItem(this, this.uuid);
        let data = JSON.parse((yield this.response.body()).toString());
        this.attach("List API Response :");
        this.attach(JSON.stringify(data), 'application/json');
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 200");
        (0, test_1.expect)(this.response.status()).toBe(200);
        (0, test_1.expect)(data.id).toEqual(this.uuid);
        (0, test_1.expect)(data.isCompleted).toEqual(status_complete);
    });
});
//Scenario: User is able to update status of already completed item
