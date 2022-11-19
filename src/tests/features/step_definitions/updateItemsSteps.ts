import { Given, When, Then } from "@cucumber/cucumber";
import { APIResponse, expect } from "@playwright/test";
import {listItem} from "../../../commonFunctions/list"
import {createItem} from "../../../commonFunctions/create"
import {updateItem} from "../../../commonFunctions/update"

let updated_desc = "Modified Description"
let status_complete = true
let status_incomplete = false
let currentStatus = false

//Scenario: User is able to update description of ToDo item
    Given('When the list has items to update',async function(){
        this.uuid = await createItem.createRandomItem(this);
        this.attach("Generated random UUID " + this.uuid +" to list" )
    });

    When('User updates description of the items',async function(){
        //uuid = "72be6b1a-166d-4669-bdf9-ce182f0192b0"
        this.attach("Listing item with UUID " + this.uuid)
        this.response = await listItem.listItem(this,this.uuid)
        let data = JSON.parse((await this.response.body()).toString());
        this.attach("List Item API Response :")
        this.attach(JSON.stringify(data),'application/json')
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 200" )
        expect(this.response.status()).toBe(200);
        this.attach("Updating description of Item")
        this.response = await updateItem.updateDecription(this,this.uuid,updated_desc,data.isCompleted)
    });

    Then('Item description is updated successfully',async function(){
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 204" )
        expect(this.response.status()).toBe(204);
        this.attach("Update successful")
        this.attach("Update API Response :")
        
        this.attach("Listing item with UUID " + this.uuid)
        this.response = await listItem.listItem(this,this.uuid)
        
        let data = JSON.parse((await this.response.body()).toString()); 
        
        this.attach("List Item API Response :")
        this.attach(JSON.stringify(data),'application/json')
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 200" )
        
        expect(this.response.status()).toBe(200);
        expect(data.id).toEqual(this.uuid)
        expect(data.description).toEqual(updated_desc)
    });


//Scenario: User is able to update status of and item

    When('User updates status of the items',async function(){
        this.response = await listItem.listItem(this,this.uuid)
        let data = JSON.parse((await this.response.body()).toString());
        this.attach("List Item API Response :")
        this.attach(JSON.stringify(data),'application/json')
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 200" ) 
        expect(this.response.status()).toBe(200);
        currentStatus = data.isCompleted
        if(currentStatus){
            this.response = await updateItem.updateStatus(this,this.uuid,status_incomplete)
        }else{
            this.response = await updateItem.updateStatus(this,this.uuid,status_complete)
        }
        
    });

    Then('Item status is updated successfully',async function(){
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 204" ) 
        
        expect(this.response.status()).toBe(204);
        this.response = await listItem.listItem(this,this.uuid)
        let data = JSON.parse((await this.response.body()).toString()); 

        this.attach("List API Response :")
        this.attach(JSON.stringify(data),'application/json')
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 200" ) 

        expect(this.response.status()).toBe(200);
        expect(data.id).toEqual(this.uuid)
        if(currentStatus){
            expect(data.isCompleted).toEqual(status_incomplete)
        }else{
            expect(data.isCompleted).toEqual(status_complete)
        }
        
    });


//Scenario: User is able to update description of already completed item
    Given('When user creates an item and marks it complete',async function(){
        this.uuid = await createItem.createRandomItem(this);
        this.attach("Generated random UUID " + this.uuid +" to list" )
        
        this.response = await updateItem.updateStatus(this,this.uuid,status_complete)
    

        this.response = await listItem.listItem(this,this.uuid)
        let data = JSON.parse((await this.response.body()).toString()); 

        this.attach("List API Response :")
        this.attach(JSON.stringify(data),'application/json')
        this.attach("Received respose status as - " + this.response.status() + " Expected status was 200" ) 

        expect(this.response.status()).toBe(200);
        expect(data.id).toEqual(this.uuid)
        expect(data.isCompleted).toEqual(status_complete)
    });
    
//Scenario: User is able to update status of already completed item