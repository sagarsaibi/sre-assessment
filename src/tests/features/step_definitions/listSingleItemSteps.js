"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
//Scenario: List items when ToDo list is empty
(0, cucumber_1.Given)('When the list is empty', function () {
    console.log("Given");
});
(0, cucumber_1.When)('User lists ToDo items with ID', function () {
    console.log("Given");
});
(0, cucumber_1.Then)('Empty list is displayed with error message', function () {
    console.log("Given");
});
//Scenario: List items with ToDO list has items
(0, cucumber_1.Given)('When the list has items', function () {
    console.log("Given");
});
(0, cucumber_1.Then)('Item is displayed with success', function () {
    console.log("Given");
});
//Scenario: List items with incorrect ID
(0, cucumber_1.When)('User lists ToDo items with wrong ID', function () {
    console.log("Given");
});
(0, cucumber_1.Then)('Error message is displayed', function () {
    console.log("Given");
});
