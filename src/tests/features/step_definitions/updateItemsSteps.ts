import { Given, When, Then } from "@cucumber/cucumber";
import { APIResponse, expect } from "@playwright/test";
import {listItem} from "../../../commonFunctions/list"
import {createItem} from "../../../commonFunctions/create"
import {updateItem} from "../../../commonFunctions/update"

let response: APIResponse
let uuid = ""
let updated_desc = "Modified Description"
let status_complete = true
let status_incomplete = false
let currentStatus = false

//Scenario: User is able to update description of ToDo item
    Given('When the list has items to update',async function(){
        uuid = await createItem.createRandomItem();
    });

    When('User updates description of the items',async function(){
        //uuid = "72be6b1a-166d-4669-bdf9-ce182f0192b0"
        response = await listItem.listItem(uuid)
        let data = JSON.parse((await response.body()).toString()); 
        expect(response.status()).toBe(200);
        response = await updateItem.updateDecription(uuid,updated_desc,data.isCompleted)
    });

    Then('Item description is updated successfully',async function(){
        expect(response.status()).toBe(204);
        response = await listItem.listItem(uuid)
        let data = JSON.parse((await response.body()).toString()); 
        expect(response.status()).toBe(200);
        expect(data.id).toEqual(uuid)
        expect(data.description).toEqual(updated_desc)
    });


//Scenario: User is able to update status of and item

    When('User updates status of the items',async function(){
        response = await listItem.listItem(uuid)
        let data = JSON.parse((await response.body()).toString()); 
        expect(response.status()).toBe(200);
        currentStatus = data.isCompleted
        if(currentStatus){
            response = await updateItem.updateStatus(uuid,status_incomplete)
        }else{
            response = await updateItem.updateStatus(uuid,status_complete)
        }
        
    });

    Then('Item status is updated successfully',async function(){
        expect(response.status()).toBe(204);
        response = await listItem.listItem(uuid)
        let data = JSON.parse((await response.body()).toString()); 
        expect(response.status()).toBe(200);
        expect(data.id).toEqual(uuid)
        if(currentStatus){
            expect(data.isCompleted).toEqual(status_incomplete)
        }else{
            expect(data.isCompleted).toEqual(status_complete)
        }
        
    });


//Scenario: User is able to update description of already completed item
    Given('When user creates an item and marks it complete',async function(){
        uuid = await createItem.createRandomItem();
        response = await updateItem.updateStatus(uuid,status_complete)
        response = await listItem.listItem(uuid)
        let data = JSON.parse((await response.body()).toString()); 
        expect(response.status()).toBe(200);
        expect(data.id).toEqual(uuid)
        expect(data.isCompleted).toEqual(status_complete)
    });
    
//Scenario: User is able to update status of already completed item