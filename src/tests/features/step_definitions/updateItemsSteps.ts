import { Given, When, Then } from "@cucumber/cucumber";



//Scenario: User is able to update description of ToDo item
    Given('When the list has items to update',function(){
        console.log("Given")
    });
    When('User updates description of the items',function(){
        console.log("When")
    });
    Then('Item description is updated successfully',function(){
        console.log("Then")
    });


//Scenario: User is able to update status of and item

    When('User updates status of the items',function(){
        console.log("When")
    });
    Then('Item status is updated successfully',function(){
        console.log("Then")
    });