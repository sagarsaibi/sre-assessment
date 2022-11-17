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



//Scenario: Create new item with without description
    When('User creates a new ToDo item without description', function(){
        console.log("Then")
    });
    Then('A new item is not created', function(){
        console.log("Then")
    });

//Scenario: Create new item with duplicate data
    When('User creates a new ToDo item with description', function(){
        console.log("Then")
    });

    When('When user create item with same description', function(){
        console.log("Then")
    });
    Then('Item is is not created', function(){
        console.log("Then")
    });

//Scenario: Create new item with same description as of the completed task

    When('User marks the task as completed with the description', function(){
        console.log("Then")
    });


//Scenario Outline: Create new item with speacial character
    When('User creates a new ToDo item with special character {string}', function(description:string){
        console.log("Then")
    });
    Then('A new item is created in the list with special character', function(){
        console.log("Then")
    });

//Scenario Outline: Create new item with long characters string
          
    When('User creates a new ToDo item with  long description {string}', function(description:string){
        console.log("Then")
    });

    Then('A new item is created in the list with long description', function(){
        console.log("Then")
    });
