import { Given, When, Then } from "@cucumber/cucumber";
import { APIResponse, expect } from "@playwright/test";
import {listItem} from "../../../commonFunctions/list"
import {createItem} from "../../../commonFunctions/create"

let response: APIResponse
let uuid = ""
//Scenario: List items with ToDo list is empty
    // Given('When the list is empty',function(){
    //     console.log("Given")
    // });
 
    When('User lists ToDo items',async function(){
        console.log("When")
        response = await listItem.emptyList()
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

    
    When('User creates few items',async function(){
        console.log("When")
        for(let i = 0; i < 5; i++){
            console.log("Creating user " + i)
            uuid = await createItem.createRandomItem();
            console.log("Create item with id   " + uuid)
        }
        
    });

    Then('Item list is displayed successfully',async function(){
        console.log("Then")
        response = await listItem.listAll()
        expect(response.status()).toBe(200);
        let data = JSON.parse((await response.body()).toString());
        expect(data.length).toBeGreaterThan(0)
    });