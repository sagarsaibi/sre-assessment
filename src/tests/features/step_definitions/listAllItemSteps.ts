import { Given, When, Then } from "@cucumber/cucumber";
import { APIResponse, expect } from "@playwright/test";
import {listItem} from "../../../commonFunctions/list"


let response: APIResponse
let response2: APIResponse
//Scenario: List items with ToDo list is empty
    // Given('When the list is empty',function(){
    //     console.log("Given")
    // });
 
    When('User lists ToDo items',async function(){
        console.log("When")
        response = await listItem.listAll()
    });

    Then('Empty list is displayed successfully',async function(){
        expect(response.status()).toBe(200);
        let data = JSON.parse((await response.body()).toString());
        console.log("LIST ALL DATA LENGHT " + data.length)
        console.log("Printing data - " + JSON.stringify(data))
        expect(data.length).toBe(0)
    });

//Scenario: List items with ToDo list is has items
    // Given('When the list has items',function(){
    //     console.log("Given")
    // });

    Then('Item list is displayed successfully',async function(){
        console.log("Then")
        expect(response.status()).toBe(200);
        let data = JSON.parse((await response.body()).toString());
        expect(data.length).toBeGreaterThan(0)
    });