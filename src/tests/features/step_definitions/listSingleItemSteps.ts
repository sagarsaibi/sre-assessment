import { Given, When, Then, World } from "@cucumber/cucumber";
import { APIResponse, expect } from "@playwright/test";
import {common} from "../../../commonFunctions/common"
import {listItem} from "../../../commonFunctions/list"
import {createItem} from "../../../commonFunctions/create"
import { Myclass } from '../../../commonFunctions/Myclass';


//Scenario: List items when ToDo list is empty
    Given('When the list is empty',async function(){
        await listItem.emptyList(this)
    });

    When('User lists ToDo items with ID',async function(){
        this.uuid = common.generateUUID();
        this.attach("Generated random UUID " + this.uuid +" to list" )
        this.attach("Listing item with UUID " + this.uuid)
        this.response = await listItem.listItem(this,this.uuid)
    });

    Then('Error message is displayed',async function(){
        expect(this.response.status()).toBe(404);
        let resString = (await this.response.body()).toString()
        
        this.attach("List Item API Response :")
        this.attach(resString,'application/json')
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 404" )
        this.attach("Received respose - " + resString + " Expected response was Todo item with id "+this.uuid+" not found")
        
        expect(resString).toEqual("Todo item with id "+this.uuid+" not found")
    });

//Scenario: List items with ToDO list has items
    Given('When the list has items',async function(){
        this.uuid = await createItem.createRandomItem(this);
        this.attach("Created new item with UUID " + this.uuid)
    });

    When('User lists ToDo items with ID from list',async function(){
        //uuid = "72be6b1a-166d-4669-bdf9-ce182f0192b0"
        this.attach("Listing item with UUID " + this.uuid)
        this.response = await listItem.listItem(this,this.uuid) 
        
    });

    Then('Item is displayed with success',async function(){
        let data = JSON.parse((await this.response.body()).toString());
        this.attach("List Item API Response :")
        this.attach(JSON.stringify(data),'application/json')
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 200" )
        expect(this.response.status()).toBe(200);
        expect(data.id).toEqual(this.uuid)
    });

//Scenario: List items with incorrect ID
    When('User lists ToDo items with wrong ID',async function(){
        this.uuid = "72be6b1a-166d-4669-bdf9-ce182f0192b0"
        this.attach("Listing item with incorrect UUID " + this.uuid)
        this.response = await listItem.listItem(this,this.uuid)
        
    });
    Then('Error message is displayed for wrong ID',async function(){
        expect(this.response.status()).toBe(404);
        let resString = (await this.response.body()).toString()

        this.attach("List Item API Response :")
        this.attach(resString,'application/json')
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 404" )
        
        
        expect(resString).toEqual("Todo item with id "+this.uuid+" not found")
        this.attach("Received respose - " + resString + " Expected response was Todo item with id "+this.uuid+" not found")
    });