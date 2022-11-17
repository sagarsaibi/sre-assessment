"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
//Scenario: List items with ToDo list is empty
// Given('When the list is empty',function(){
//     console.log("Given")
// });
(0, cucumber_1.When)('User lists ToDo items', function () {
    console.log("When");
});
(0, cucumber_1.Then)('Empty list is displayed successfully', function () {
    console.log("Then");
});
//Scenario: List items with ToDo list is has items
// Given('When the list has items',function(){
//     console.log("Given")
// });
(0, cucumber_1.Then)('Item list is displayed successfully', function () {
    console.log("Then");
});
