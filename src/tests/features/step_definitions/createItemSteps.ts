import { Given, When, Then } from "@cucumber/cucumber";
import { APIResponse, expect } from "@playwright/test";
import {listItem} from "../../../commonFunctions/list"
import {createItem} from "../../../commonFunctions/create"
import {updateItem} from "../../../commonFunctions/update"

let response: APIResponse
let uuid = ""
let dupDesc = "duplicate description"


//Scenario: Create new item when list is empty
    Given('When the ToDo list is empty',async function(){
        await listItem.emptyList()
    });

    When('User creates a new ToDo item',async function(){
        uuid = await createItem.createRandomItem();
    });

    Then('A new item is created in the list',async function(){
        response = await listItem.listItem(uuid)
        expect(response.status()).toBe(200);
        let data = JSON.parse((await response.body()).toString()); 
        expect(data.id).toEqual(uuid)
    });

//Scenario: Create new item with without description
    When('User creates a new ToDo item without description', async function(){
        response = await createItem.createItemWithoutDesc();
    });
    Then('Error message for no description is displayed', async function(){
        let data = JSON.parse((await response.body()).toString()); 
        expect(response.status()).toBe(400);
        expect(data.errors.Description[0]).toEqual("Description field can not be empty")
    });

//Scenario: Create new item with duplicate data
    When('User creates a new ToDo item with description', async function(){
        response = await createItem.createItemWithDesc(dupDesc);
        uuid = JSON.parse((await response.body()).toString());
    });

    When('User create item with same description', async function(){
        response = await createItem.createItemWithDesc(dupDesc);
        //uuid = JSON.parse((await response.body()).toString());
        //expect(response.status()).toBe(201);
    });

    Then('Error message for duplicate description is displayed', async function(){
        let data = (await response.body()).toString();
        expect(response.status()).toBe(409);
        expect(data).toEqual("A todo item with description already exists")
    });

//Scenario: Create new item with same description as of the completed task

    When('User marks the task as completed with the description',async  function(){
        response = await updateItem.updateStatus(uuid,true)
        response = await listItem.listItem(uuid)
        let data = JSON.parse((await response.body()).toString()); 
        expect(response.status()).toBe(200);
        expect(data.id).toEqual(uuid)
        expect(data.isCompleted).toEqual(true)
    });


//Scenario Outline: Create new item with speacial character
    When('User creates a new ToDo item with special character {string}', async function(description:string){
        response = await createItem.createItemWithDesc(description);
        expect(response.status()).toBe(201);
        uuid = JSON.parse((await response.body()).toString());
    });

    Then('A new item is created in the list with special character', async function(){
        response = await listItem.listItem(uuid)
        expect(response.status()).toBe(200);
        let data = JSON.parse((await response.body()).toString()); 
        expect(data.id).toEqual(uuid)
    });

//Scenario Outline: Create new item with long characters string
          
    When('User creates a new ToDo item with long description {string}', async function(description:string){
        response = await createItem.createItemWithDesc(description);
        expect(response.status()).toBe(201);
        uuid = JSON.parse((await response.body()).toString());
    });

    Then('A new item is created in the list with long description', async function(){
        response = await listItem.listItem(uuid)
        expect(response.status()).toBe(200);
        let data = JSON.parse((await response.body()).toString()); 
        expect(data.id).toEqual(uuid)
    });
