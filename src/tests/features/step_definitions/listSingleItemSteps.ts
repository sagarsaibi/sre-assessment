import { Given, When, Then } from "@cucumber/cucumber";

//Scenario: List items when ToDo list is empty
    Given('When the list is empty',function(){
        console.log("Given")
    });
    When('User lists ToDo items with ID',function(){
        console.log("Given")
    });
    Then('Empty list is displayed with error message',function(){
        console.log("Given")
    });

//Scenario: List items with ToDO list has items
    Given('When the list has items',function(){
        console.log("Given")
    });
    Then('Item is displayed with success',function(){
        console.log("Given")
    });

//Scenario: List items with incorrect ID
    When('User lists ToDo items with wrong ID',function(){
        console.log("Given")
    });
    Then('Error message is displayed',function(){
        console.log("Given")
    });