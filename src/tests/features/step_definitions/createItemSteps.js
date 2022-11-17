"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
(0, cucumber_1.Given)('When the ToDo list is empty', function () {
    console.log("Given");
});
(0, cucumber_1.When)('User creates a new ToDo item', function () {
    console.log("When");
});
(0, cucumber_1.Then)('A new item is created in the list', function () {
    console.log("Then");
});
//Scenario: Create new item with without description
(0, cucumber_1.When)('User creates a new ToDo item without description', function () {
    console.log("Then");
});
(0, cucumber_1.Then)('A new item is not created', function () {
    console.log("Then");
});
//Scenario: Create new item with duplicate data
(0, cucumber_1.When)('User creates a new ToDo item with description', function () {
    console.log("Then");
});
(0, cucumber_1.When)('When user create item with same description', function () {
    console.log("Then");
});
(0, cucumber_1.Then)('Item is is not created', function () {
    console.log("Then");
});
//Scenario: Create new item with same description as of the completed task
(0, cucumber_1.When)('User marks the task as completed with the description', function () {
    console.log("Then");
});
//Scenario Outline: Create new item with speacial character
(0, cucumber_1.When)('User creates a new ToDo item with special character {string}', function (description) {
    console.log("Then");
});
(0, cucumber_1.Then)('A new item is created in the list with special character', function () {
    console.log("Then");
});
//Scenario Outline: Create new item with long characters string
(0, cucumber_1.When)('User creates a new ToDo item with  long description {string}', function (description) {
    console.log("Then");
});
(0, cucumber_1.Then)('A new item is created in the list with long description', function () {
    console.log("Then");
});
