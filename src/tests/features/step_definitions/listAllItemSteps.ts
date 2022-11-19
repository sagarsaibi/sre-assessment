import { When, Then } from "@cucumber/cucumber";
import { APIResponse, expect } from "@playwright/test";
import {listItem} from "../../../commonFunctions/list"
import {createItem} from "../../../commonFunctions/create"

//Scenario: List items with ToDo list is empty
    When('User lists ToDo items',async function(){
        this.response = await listItem.listAll(this)
        
   });

    Then('Empty list is displayed successfully',async function(){
        expect(this.response.status()).toBe(200);
        let data = JSON.parse((await this.response.body()).toString());
        console.log("DATAAAA - " + data)
        this.attach("List All API Response :")
        this.attach(JSON.stringify(data),'application/json')
        expect(data.length).toBe(0)
    });

//Scenario: List items with ToDo list is has items
    When('User creates few items',async function(){
        for(let i = 0; i < 5; i++){
            this.uuid = await createItem.createRandomItem(this);
        }
    });

    Then('Item list is displayed successfully',async function(){
        this.response = await listItem.listAll(this)
        expect(this.response.status()).toBe(200);
        let data = JSON.parse((await this.response.body()).toString());
        this.attach("List All API Response :")
        this.attach(JSON.stringify(data),'application/json')
        
        expect(data.length).toBeGreaterThan(0)
    });