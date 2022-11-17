import { Given, When, Then } from "@cucumber/cucumber";

Given('When the ToDo list is empty',function(){
    console.log("Given")
});

When('User creates a new ToDo item',function(){
    console.log("When")
});

Then('A new item is created in the list', function(){
    console.log("Then")
});