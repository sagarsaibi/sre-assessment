import { Given, When, Then } from "@cucumber/cucumber";
import { APIResponse, expect } from "@playwright/test";
import {listItem} from "../../../commonFunctions/list"
import {createItem} from "../../../commonFunctions/create"
import {updateItem} from "../../../commonFunctions/update"


let dupDesc = "duplicate description"

//Scenario: Create new item when list is empty
    Given('When the ToDo list is empty',async function(){
        await listItem.emptyList(this)
    });

    When('User creates a new ToDo item',async function(){
        this.uuid = await createItem.createRandomItem(this);
        this.attach("Generated random UUID " + this.uuid +" to list" )
        this.attach("Listing item with UUID " + this.uuid)
    });

    Then('A new item is created in the list',async function(){
        this.response = await listItem.listItem(this,this.uuid)
        let data = JSON.parse((await this.response.body()).toString()); 

        this.attach("List Item API Response :")
        this.attach(JSON.stringify(data),'application/json')
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 200")

        expect(this.response.status()).toBe(200);
        expect(data.id).toEqual(this.uuid)
    });

//Scenario: Create new item with without description
    When('User creates a new ToDo item without description', async function(){
        this.response = await createItem.createItemWithoutDesc(this);
    });
    Then('Error message for no description is displayed', async function(){
        let data = JSON.parse((await this.response.body()).toString()); 

        this.attach("Create Item API Response :")
        this.attach(JSON.stringify(data),'application/json')
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 400")


        expect(this.response.status()).toBe(400);
        expect(data.errors.Description[0]).toEqual("Description field can not be empty")
    });

//Scenario: Create new item with duplicate data
    When('User creates a new ToDo item with description', async function(){
        this.attach("Create item with duplicate description - " + dupDesc)
        this.response = await createItem.createItemWithDesc(this,dupDesc);
        this.attach("Create Item API Response :")
        this.uuid = JSON.parse((await this.response.body()).toString());
        //this.attach(JSON.stringify(this.uuid),'application/json')
        
    });

    When('User create item with same description', async function(){
        this.attach("Create item with same duplicate description - " + dupDesc)
        this.response = await createItem.createItemWithDesc(this,dupDesc);
        

    });

    Then('Error message for duplicate description is displayed', async function(){
        let data = (await this.response.body()).toString();

        this.attach("Received respose status as - " + this.response.status() + " Expected status was 409")
        this.attach("Received respose - " + data + " Expected response was A todo item with description already exists")

        expect(this.response.status()).toBe(409);
        expect(data).toEqual("A todo item with description already exists")
    });

//Scenario: Create new item with same description as of the completed task

    When('User marks the task as completed with the description',async  function(){
        this.response = await updateItem.updateStatus(this,this.uuid,true)
        
        this.response = await listItem.listItem(this,this.uuid)
        let data = JSON.parse((await this.response.body()).toString()); 

        this.attach("List Item API Response :")
        this.attach(JSON.stringify(data),'application/json')
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 200")

        expect(this.response.status()).toBe(200);
        expect(data.id).toEqual(this.uuid)
        expect(data.isCompleted).toEqual(true)
    });


//Scenario Outline: Create new item with speacial character
    When('User creates a new ToDo item with special character {string}', async function(description:string){
        this.response = await createItem.createItemWithDesc(this,description);

        this.attach("Create Item API Response :")
        this.attach(JSON.stringify(JSON.parse((await this.response.body()).toString())),'application/json')
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 409")

        expect(this.response.status()).toBe(201);
        this.uuid = JSON.parse((await this.response.body()).toString());
    });

    Then('A new item is created in the list with special character', async function(){
        this.response = await listItem.listItem(this,this.uuid)
        let data = JSON.parse((await this.response.body()).toString()); 
        
        this.attach("List Item API Response :")
        this.attach(JSON.stringify(data),'application/json')
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 200")

        expect(this.response.status()).toBe(200);
        expect(data.id).toEqual(this.uuid)
    });

//Scenario Outline: Create new item with long characters string
          
    When('User creates a new ToDo item with long description {string}', async function(description:string){
        this.response = await createItem.createItemWithDesc(this,description);
        expect(this.response.status()).toBe(201);
        this.uuid = JSON.parse((await this.response.body()).toString());
    });

    Then('A new item is created in the list with long description', async function(){
        this.response = await listItem.listItem(this,this.uuid)
        let data = JSON.parse((await this.response.body()).toString()); 
        
        this.attach("List Item API Response :")
        this.attach(JSON.stringify(data),'application/json')
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 200")

        expect(this.response.status()).toBe(200);
        expect(data.id).toEqual(this.uuid)
    });
