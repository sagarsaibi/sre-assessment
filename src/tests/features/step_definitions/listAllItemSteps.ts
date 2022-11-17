import { Given, When, Then } from "@cucumber/cucumber";

//Scenario: List items with ToDo list is empty
    // Given('When the list is empty',function(){
    //     console.log("Given")
    // });
    When('User lists ToDo items',function(){
        console.log("When")
    });
    Then('Empty list is displayed successfully',function(){
        console.log("Then")
    });

//Scenario: List items with ToDo list is has items
    // Given('When the list has items',function(){
    //     console.log("Given")
    // });
    Then('Item list is displayed successfully',function(){
        console.log("Then")
    });