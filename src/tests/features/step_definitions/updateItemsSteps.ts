import { Given, When, Then } from "@cucumber/cucumber";
import { APIResponse, expect } from "@playwright/test";
import {context} from "../../../../cucumber.conf"
import * as URI  from "../../../support/URI_CONSTANTS"
import {common} from "../../../commonFunctions/common"
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
        console.log("Given")
        uuid = await createItem.createRandomItem();
        console.log("Create item with id   " + uuid)
    });

    When('User updates description of the items',async function(){
        //uuid = "72be6b1a-166d-4669-bdf9-ce182f0192b0"
        console.log("When - Generating UUID " + uuid)

        response = await listItem.listItem(uuid)
        let data = JSON.parse((await response.body()).toString()); 
        expect(response.status()).toBe(200);
        response = await updateItem.updateDecription(uuid,updated_desc,data.isCompleted)
        console.log("Response THEN ID - " + JSON.stringify(response))
    });

    Then('Item description is updated successfully',async function(){
        console.log("Then")
        expect(response.status()).toBe(204);

        response = await listItem.listItem(uuid)
        console.log("Response THEN ID - " + JSON.stringify(response))
        let data = JSON.parse((await response.body()).toString()); 
        expect(response.status()).toBe(200);
        expect(data.id).toEqual(uuid)
        console.log("UPDATED DESCRIPTION - " + data.description)
        expect(data.description).toEqual(updated_desc)

    });


//Scenario: User is able to update status of and item

    When('User updates status of the items',async function(){
        console.log("When")
        console.log("When - Generating UUID " + uuid)

        response = await listItem.listItem(uuid)
        let data = JSON.parse((await response.body()).toString()); 
        expect(response.status()).toBe(200);
        currentStatus = data.isCompleted
        console.log("CURRENT STATUS IS " + currentStatus)
        if(currentStatus){
            response = await updateItem.updateStatus(uuid,status_incomplete)
        }else{
            response = await updateItem.updateStatus(uuid,status_complete)
        }
        console.log("Response THEN ID - " + JSON.stringify(response))
    });
    Then('Item status is updated successfully',async function(){
        console.log("Then")
        expect(response.status()).toBe(204);
        response = await listItem.listItem(uuid)
        let data = JSON.parse((await response.body()).toString()); 
        console.log("UPDATED STATUS  - " + JSON.stringify(data))
        expect(response.status()).toBe(200);
        expect(data.id).toEqual(uuid)
        console.log("UPDATED Status - " + JSON.stringify(data.isCompleted))
        if(currentStatus){
            expect(data.isCompleted).toEqual(status_incomplete)
        }else{
            expect(data.isCompleted).toEqual(status_complete)
        }
        
    });


//Scenario: User is able to update description of already completed item
    Given('When user creates an item and marks it complete',async function(){
        console.log("Given")
        uuid = await createItem.createRandomItem();
        console.log("Create item with id   " + uuid)
        response = await updateItem.updateStatus(uuid,status_complete)
        response = await listItem.listItem(uuid)
        let data = JSON.parse((await response.body()).toString()); 
        expect(response.status()).toBe(200);
        expect(data.id).toEqual(uuid)
        console.log("GIVEN UPDATED Status - " + JSON.stringify(data.isCompleted))
        expect(data.isCompleted).toEqual(status_complete)
    });
    
//Scenario: User is able to update status of already completed item