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
