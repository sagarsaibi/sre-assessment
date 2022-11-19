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
let dupDesc = "duplicate description";
//Scenario: Create new item when list is empty
(0, cucumber_1.Given)('When the ToDo list is empty', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield list_1.listItem.emptyList(this);
    });
});
(0, cucumber_1.When)('User creates a new ToDo item', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.uuid = yield create_1.createItem.createRandomItem(this);
        this.attach("Generated random UUID " + this.uuid + " to list");
        this.attach("Listing item with UUID " + this.uuid);
    });
});
(0, cucumber_1.Then)('A new item is created in the list', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.response = yield list_1.listItem.listItem(this, this.uuid);
        let data = JSON.parse((yield this.response.body()).toString());
        this.attach("List Item API Response :");
        this.attach(JSON.stringify(data), 'application/json');
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 200");
        (0, test_1.expect)(this.response.status()).toBe(200);
        (0, test_1.expect)(data.id).toEqual(this.uuid);
    });
});
//Scenario: Create new item with without description
(0, cucumber_1.When)('User creates a new ToDo item without description', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.response = yield create_1.createItem.createItemWithoutDesc(this);
    });
});
(0, cucumber_1.Then)('Error message for no description is displayed', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let data = JSON.parse((yield this.response.body()).toString());
        this.attach("Create Item API Response :");
        this.attach(JSON.stringify(data), 'application/json');
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 400");
        (0, test_1.expect)(this.response.status()).toBe(400);
        (0, test_1.expect)(data.errors.Description[0]).toEqual("Description field can not be empty");
    });
});
//Scenario: Create new item with duplicate data
(0, cucumber_1.When)('User creates a new ToDo item with description', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.attach("Create item with duplicate description - " + dupDesc);
        this.response = yield create_1.createItem.createItemWithDesc(this, dupDesc);
        this.attach("Create Item API Response :");
        this.uuid = JSON.parse((yield this.response.body()).toString());
        //this.attach(JSON.stringify(this.uuid),'application/json')
    });
});
(0, cucumber_1.When)('User create item with same description', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.attach("Create item with same duplicate description - " + dupDesc);
        this.response = yield create_1.createItem.createItemWithDesc(this, dupDesc);
    });
});
(0, cucumber_1.Then)('Error message for duplicate description is displayed', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let data = (yield this.response.body()).toString();
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 409");
        this.attach("Received respose - " + data + " Expected response was A todo item with description already exists");
        (0, test_1.expect)(this.response.status()).toBe(409);
        (0, test_1.expect)(data).toEqual("A todo item with description already exists");
    });
});
//Scenario: Create new item with same description as of the completed task
(0, cucumber_1.When)('User marks the task as completed with the description', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.response = yield update_1.updateItem.updateStatus(this, this.uuid, true);
        this.response = yield list_1.listItem.listItem(this, this.uuid);
        let data = JSON.parse((yield this.response.body()).toString());
        this.attach("List Item API Response :");
        this.attach(JSON.stringify(data), 'application/json');
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 200");
        (0, test_1.expect)(this.response.status()).toBe(200);
        (0, test_1.expect)(data.id).toEqual(this.uuid);
        (0, test_1.expect)(data.isCompleted).toEqual(true);
    });
});
//Scenario Outline: Create new item with speacial character
(0, cucumber_1.When)('User creates a new ToDo item with special character {string}', function (description) {
    return __awaiter(this, void 0, void 0, function* () {
        this.response = yield create_1.createItem.createItemWithDesc(this, description);
        this.attach("Create Item API Response :");
        this.attach(JSON.stringify(JSON.parse((yield this.response.body()).toString())), 'application/json');
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 409");
        (0, test_1.expect)(this.response.status()).toBe(201);
        this.uuid = JSON.parse((yield this.response.body()).toString());
    });
});
(0, cucumber_1.Then)('A new item is created in the list with special character', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.response = yield list_1.listItem.listItem(this, this.uuid);
        let data = JSON.parse((yield this.response.body()).toString());
        this.attach("List Item API Response :");
        this.attach(JSON.stringify(data), 'application/json');
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 200");
        (0, test_1.expect)(this.response.status()).toBe(200);
        (0, test_1.expect)(data.id).toEqual(this.uuid);
    });
});
//Scenario Outline: Create new item with long characters string
(0, cucumber_1.When)('User creates a new ToDo item with long description {string}', function (description) {
    return __awaiter(this, void 0, void 0, function* () {
        this.response = yield create_1.createItem.createItemWithDesc(this, description);
        (0, test_1.expect)(this.response.status()).toBe(201);
        this.uuid = JSON.parse((yield this.response.body()).toString());
    });
});
(0, cucumber_1.Then)('A new item is created in the list with long description', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.response = yield list_1.listItem.listItem(this, this.uuid);
        let data = JSON.parse((yield this.response.body()).toString());
        this.attach("List Item API Response :");
        this.attach(JSON.stringify(data), 'application/json');
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 200");
        (0, test_1.expect)(this.response.status()).toBe(200);
        (0, test_1.expect)(data.id).toEqual(this.uuid);
    });
});
