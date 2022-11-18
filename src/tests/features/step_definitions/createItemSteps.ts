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
let dupDesc = "duplicate description"


//Scenario: Create new item when list is empty
    Given('When the ToDo list is empty',async function(){
        console.log("Given")
        await listItem.emptyList()
    });

    When('User creates a new ToDo item',async function(){
        console.log("When")
        uuid = await createItem.createRandomItem();
        console.log("Create item with id   " + uuid)
    });

    Then('A new item is created in the list',async function(){
        console.log("Then")
        response = await listItem.listItem(uuid)
        expect(response.status()).toBe(200);
        console.log("Response THEN ID - " + JSON.stringify(response))
        let data = JSON.parse((await response.body()).toString()); 
        expect(data.id).toEqual(uuid)
    });

//Scenario: Create new item with without description
    When('User creates a new ToDo item without description', async function(){
        console.log("When")
        response = await createItem.createItemWithoutDesc();
        console.log("Create item with id   " + uuid)
    });
    Then('Error message for no description is displayed', async function(){
        console.log("Then")
        let data = JSON.parse((await response.body()).toString()); 
        console.log("CREATE WITHOUT DESCRIPTION" + JSON.stringify(data.errors.Description[0]))
        expect(response.status()).toBe(400);
        expect(data.errors.Description[0]).toEqual("Description field can not be empty")
    });

//Scenario: Create new item with duplicate data
    When('User creates a new ToDo item with description', async function(){
        console.log("CREATING USER WITH SAME DESC")
        response = await createItem.createItemWithDesc(dupDesc);
        uuid = JSON.parse((await response.body()).toString());
        console.log("UUID OS ITEM " + uuid)
    });

    When('User create item with same description', async function(){
        console.log("Then")
        console.log("CREATING USER WITH DUPLICATE DESC")
        response = await createItem.createItemWithDesc(dupDesc);
        //uuid = JSON.parse((await response.body()).toString());
        console.log("DUPLICATE DESCRIPTION UUID" + JSON.stringify(response))
        //expect(response.status()).toBe(201);
    });

    Then('Error message for duplicate description is displayed', async function(){
        console.log("DUPLICATE DESCRIPTION")
        console.log("CREATE WITH SAME DESCRIPTION" + JSON.stringify(response))
        let data = (await response.body()).toString();
        console.log("CREATE WITH SAME DESCRIPTION" + data)
        expect(response.status()).toBe(409);
        expect(data).toEqual("A todo item with description already exists")
    });

//Scenario: Create new item with same description as of the completed task

    When('User marks the task as completed with the description',async  function(){
        console.log("Then")
        console.log("Create item with id   " + uuid)
        response = await updateItem.updateStatus(uuid,true)
        response = await listItem.listItem(uuid)
        let data = JSON.parse((await response.body()).toString()); 
        expect(response.status()).toBe(200);
        expect(data.id).toEqual(uuid)
        console.log("GIVEN UPDATED Status - " + JSON.stringify(data.isCompleted))
        expect(data.isCompleted).toEqual(true)
    });


//Scenario Outline: Create new item with speacial character
    When('User creates a new ToDo item with special character {string}', async function(description:string){
        console.log("CREATING USER WITH SPECIAL CHARACHTERS "  )
        response = await createItem.createItemWithDesc(description);
        expect(response.status()).toBe(201);
        uuid = JSON.parse((await response.body()).toString());
        console.log("UUID OF ITEM " + uuid)
    });

    Then('A new item is created in the list with special character', async function(){
        response = await listItem.listItem(uuid)
        expect(response.status()).toBe(200);
        console.log("Response THEN ID - " + JSON.stringify(response))
        let data = JSON.parse((await response.body()).toString()); 
        expect(data.id).toEqual(uuid)
    });

//Scenario Outline: Create new item with long characters string
          
    When('User creates a new ToDo item with long description {string}', async function(description:string){
        console.log("Then")
        console.log("CREATING USER WITH SPECIAL CHARACHTERS " + description )
        response = await createItem.createItemWithDesc(description);
        expect(response.status()).toBe(201);
        uuid = JSON.parse((await response.body()).toString());
        console.log("UUID OF ITEM " + uuid)
    });

    Then('A new item is created in the list with long description', async function(){
        console.log("Then")
        response = await listItem.listItem(uuid)
        expect(response.status()).toBe(200);
        console.log("Response THEN ID - " + JSON.stringify(response))
        let data = JSON.parse((await response.body()).toString()); 
        expect(data.id).toEqual(uuid)
    });
