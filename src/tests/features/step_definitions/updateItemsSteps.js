"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
//Scenario: User is able to update description of ToDo item
(0, cucumber_1.Given)('When the list has items to update', function () {
    console.log("Given");
});
(0, cucumber_1.When)('User updates description of the items', function () {
    console.log("When");
});
(0, cucumber_1.Then)('Item description is updated successfully', function () {
    console.log("Then");
});
//Scenario: User is able to update status of and item
(0, cucumber_1.When)('User updates status of the items', function () {
    console.log("When");
});
(0, cucumber_1.Then)('Item status is updated successfully', function () {
    console.log("Then");
});
