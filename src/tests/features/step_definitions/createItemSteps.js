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
        console.log("Given");
        yield list_1.listItem.emptyList();
    });
});
(0, cucumber_1.When)('User creates a new ToDo item', function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("When");
        uuid = yield create_1.createItem.createRandomItem();
        console.log("Create item with id   " + uuid);
    });
});
(0, cucumber_1.Then)('A new item is created in the list', function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Then");
        response = yield list_1.listItem.listItem(uuid);
        (0, test_1.expect)(response.status()).toBe(200);
        console.log("Response THEN ID - " + JSON.stringify(response));
        let data = JSON.parse((yield response.body()).toString());
        (0, test_1.expect)(data.id).toEqual(uuid);
    });
});
//Scenario: Create new item with without description
(0, cucumber_1.When)('User creates a new ToDo item without description', function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("When");
        response = yield create_1.createItem.createItemWithoutDesc();
        console.log("Create item with id   " + uuid);
    });
});
(0, cucumber_1.Then)('Error message for no description is displayed', function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Then");
        let data = JSON.parse((yield response.body()).toString());
        console.log("CREATE WITHOUT DESCRIPTION" + JSON.stringify(data.errors.Description[0]));
        (0, test_1.expect)(response.status()).toBe(400);
        (0, test_1.expect)(data.errors.Description[0]).toEqual("Description field can not be empty");
    });
});
//Scenario: Create new item with duplicate data
(0, cucumber_1.When)('User creates a new ToDo item with description', function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("CREATING USER WITH SAME DESC");
        response = yield create_1.createItem.createItemWithDesc(dupDesc);
        uuid = JSON.parse((yield response.body()).toString());
        console.log("UUID OS ITEM " + uuid);
    });
});
(0, cucumber_1.When)('User create item with same description', function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Then");
        console.log("CREATING USER WITH DUPLICATE DESC");
        response = yield create_1.createItem.createItemWithDesc(dupDesc);
        //uuid = JSON.parse((await response.body()).toString());
        console.log("DUPLICATE DESCRIPTION UUID" + JSON.stringify(response));
        //expect(response.status()).toBe(201);
    });
});
(0, cucumber_1.Then)('Error message for duplicate description is displayed', function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("DUPLICATE DESCRIPTION");
        console.log("CREATE WITH SAME DESCRIPTION" + JSON.stringify(response));
        let data = (yield response.body()).toString();
        console.log("CREATE WITH SAME DESCRIPTION" + data);
        (0, test_1.expect)(response.status()).toBe(409);
        (0, test_1.expect)(data).toEqual("A todo item with description already exists");
    });
});
//Scenario: Create new item with same description as of the completed task
(0, cucumber_1.When)('User marks the task as completed with the description', function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Then");
        console.log("Create item with id   " + uuid);
        response = yield update_1.updateItem.updateStatus(uuid, true);
        response = yield list_1.listItem.listItem(uuid);
        let data = JSON.parse((yield response.body()).toString());
        (0, test_1.expect)(response.status()).toBe(200);
        (0, test_1.expect)(data.id).toEqual(uuid);
        console.log("GIVEN UPDATED Status - " + JSON.stringify(data.isCompleted));
        (0, test_1.expect)(data.isCompleted).toEqual(true);
    });
});
//Scenario Outline: Create new item with speacial character
(0, cucumber_1.When)('User creates a new ToDo item with special character {string}', function (description) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("CREATING USER WITH SPECIAL CHARACHTERS ");
        response = yield create_1.createItem.createItemWithDesc(description);
        (0, test_1.expect)(response.status()).toBe(201);
        uuid = JSON.parse((yield response.body()).toString());
        console.log("UUID OF ITEM " + uuid);
    });
});
(0, cucumber_1.Then)('A new item is created in the list with special character', function () {
    return __awaiter(this, void 0, void 0, function* () {
        response = yield list_1.listItem.listItem(uuid);
        (0, test_1.expect)(response.status()).toBe(200);
        console.log("Response THEN ID - " + JSON.stringify(response));
        let data = JSON.parse((yield response.body()).toString());
        (0, test_1.expect)(data.id).toEqual(uuid);
    });
});
//Scenario Outline: Create new item with long characters string
(0, cucumber_1.When)('User creates a new ToDo item with long description {string}', function (description) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Then");
        console.log("CREATING USER WITH SPECIAL CHARACHTERS " + description);
        response = yield create_1.createItem.createItemWithDesc(description);
        (0, test_1.expect)(response.status()).toBe(201);
        uuid = JSON.parse((yield response.body()).toString());
        console.log("UUID OF ITEM " + uuid);
    });
});
(0, cucumber_1.Then)('A new item is created in the list with long description', function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Then");
        response = yield list_1.listItem.listItem(uuid);
        (0, test_1.expect)(response.status()).toBe(200);
        console.log("Response THEN ID - " + JSON.stringify(response));
        let data = JSON.parse((yield response.body()).toString());
        (0, test_1.expect)(data.id).toEqual(uuid);
    });
});
