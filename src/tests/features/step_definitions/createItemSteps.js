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
let dupDesc = "duplicate description";
//Scenario: Create new item when list is empty
(0, cucumber_1.Given)('When the ToDo list is empty', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield list_1.listItem.emptyList();
    });
});
(0, cucumber_1.When)('User creates a new ToDo item', function () {
    return __awaiter(this, void 0, void 0, function* () {
        uuid = yield create_1.createItem.createRandomItem();
    });
});
(0, cucumber_1.Then)('A new item is created in the list', function () {
    return __awaiter(this, void 0, void 0, function* () {
        response = yield list_1.listItem.listItem(uuid);
        (0, test_1.expect)(response.status()).toBe(200);
        let data = JSON.parse((yield response.body()).toString());
        (0, test_1.expect)(data.id).toEqual(uuid);
    });
});
//Scenario: Create new item with without description
(0, cucumber_1.When)('User creates a new ToDo item without description', function () {
    return __awaiter(this, void 0, void 0, function* () {
        response = yield create_1.createItem.createItemWithoutDesc();
    });
});
(0, cucumber_1.Then)('Error message for no description is displayed', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let data = JSON.parse((yield response.body()).toString());
        (0, test_1.expect)(response.status()).toBe(400);
        (0, test_1.expect)(data.errors.Description[0]).toEqual("Description field can not be empty");
    });
});
//Scenario: Create new item with duplicate data
(0, cucumber_1.When)('User creates a new ToDo item with description', function () {
    return __awaiter(this, void 0, void 0, function* () {
        response = yield create_1.createItem.createItemWithDesc(dupDesc);
        uuid = JSON.parse((yield response.body()).toString());
    });
});
(0, cucumber_1.When)('User create item with same description', function () {
    return __awaiter(this, void 0, void 0, function* () {
        response = yield create_1.createItem.createItemWithDesc(dupDesc);
        //uuid = JSON.parse((await response.body()).toString());
        //expect(response.status()).toBe(201);
    });
});
(0, cucumber_1.Then)('Error message for duplicate description is displayed', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let data = (yield response.body()).toString();
        (0, test_1.expect)(response.status()).toBe(409);
        (0, test_1.expect)(data).toEqual("A todo item with description already exists");
    });
});
//Scenario: Create new item with same description as of the completed task
(0, cucumber_1.When)('User marks the task as completed with the description', function () {
    return __awaiter(this, void 0, void 0, function* () {
        response = yield update_1.updateItem.updateStatus(uuid, true);
        response = yield list_1.listItem.listItem(uuid);
        let data = JSON.parse((yield response.body()).toString());
        (0, test_1.expect)(response.status()).toBe(200);
        (0, test_1.expect)(data.id).toEqual(uuid);
        (0, test_1.expect)(data.isCompleted).toEqual(true);
    });
});
//Scenario Outline: Create new item with speacial character
(0, cucumber_1.When)('User creates a new ToDo item with special character {string}', function (description) {
    return __awaiter(this, void 0, void 0, function* () {
        response = yield create_1.createItem.createItemWithDesc(description);
        (0, test_1.expect)(response.status()).toBe(201);
        uuid = JSON.parse((yield response.body()).toString());
    });
});
(0, cucumber_1.Then)('A new item is created in the list with special character', function () {
    return __awaiter(this, void 0, void 0, function* () {
        response = yield list_1.listItem.listItem(uuid);
        (0, test_1.expect)(response.status()).toBe(200);
        let data = JSON.parse((yield response.body()).toString());
        (0, test_1.expect)(data.id).toEqual(uuid);
    });
});
//Scenario Outline: Create new item with long characters string
(0, cucumber_1.When)('User creates a new ToDo item with long description {string}', function (description) {
    return __awaiter(this, void 0, void 0, function* () {
        response = yield create_1.createItem.createItemWithDesc(description);
        (0, test_1.expect)(response.status()).toBe(201);
        uuid = JSON.parse((yield response.body()).toString());
    });
});
(0, cucumber_1.Then)('A new item is created in the list with long description', function () {
    return __awaiter(this, void 0, void 0, function* () {
        response = yield list_1.listItem.listItem(uuid);
        (0, test_1.expect)(response.status()).toBe(200);
        let data = JSON.parse((yield response.body()).toString());
        (0, test_1.expect)(data.id).toEqual(uuid);
    });
});
