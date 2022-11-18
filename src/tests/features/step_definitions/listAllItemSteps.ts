import { When, Then } from "@cucumber/cucumber";
import { APIResponse, expect } from "@playwright/test";
import {listItem} from "../../../commonFunctions/list"
import {createItem} from "../../../commonFunctions/create"

let response: APIResponse
let uuid = ""
//Scenario: List items with ToDo list is empty
    When('User lists ToDo items',async function(){
        listItem.emptyList()
        response = await listItem.listAll()
   });

    Then('Empty list is displayed successfully',async function(){
        expect(response.status()).toBe(200);
        let data = JSON.parse((await response.body()).toString());
        expect(data.length).toBe(0)
    });

//Scenario: List items with ToDo list is has items
    When('User creates few items',async function(){
        for(let i = 0; i < 5; i++){
            uuid = await createItem.createRandomItem();
        }
        
    });

    Then('Item list is displayed successfully',async function(){
        response = await listItem.listAll()
        expect(response.status()).toBe(200);
        let data = JSON.parse((await response.body()).toString());
        expect(data.length).toBeGreaterThan(0)
    });