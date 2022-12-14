import { Given, When, Then } from "@cucumber/cucumber";
import { APIResponse, expect } from "@playwright/test";
import {common} from "../../../commonFunctions/common"
import {listItem} from "../../../commonFunctions/list"
import {createItem} from "../../../commonFunctions/create"


let response: APIResponse
let uuid = ""
//Scenario: List items when ToDo list is empty
    Given('When the list is empty',async function(){
        await listItem.emptyList()
    });

    When('User lists ToDo items with ID',async function(){
        uuid = common.generateUUID();
        response = await listItem.listItem(uuid)        
    });

    Then('Error message is displayed',async function(){
        expect(response.status()).toBe(404);
        let resString = (await response.body()).toString()
        expect(resString).toEqual("Todo item with id "+uuid+" not found")
    });

//Scenario: List items with ToDO list has items
    Given('When the list has items',async function(){
        uuid = await createItem.createRandomItem();
    });

    When('User lists ToDo items with ID from list',async function(){
        //uuid = "72be6b1a-166d-4669-bdf9-ce182f0192b0"
        response = await listItem.listItem(uuid)    
    });

    Then('Item is displayed with success',async function(){
        let data = JSON.parse((await response.body()).toString()); 
        expect(response.status()).toBe(200);
        expect(data.id).toEqual(uuid)
    });

//Scenario: List items with incorrect ID
    When('User lists ToDo items with wrong ID',async function(){
        uuid = "72be6b1a-166d-4669-bdf9-ce182f0192b0"
        response = await listItem.listItem(uuid)
        
    });
    Then('Error message is displayed for wrong ID',async function(){
        expect(response.status()).toBe(404);
        let resString = (await response.body()).toString()
        expect(resString).toEqual("Todo item with id "+uuid+" not found")
    });