
import {context} from "../../cucumber.conf"
import { APIResponse, expect } from "@playwright/test";
import * as URI  from "../support/URI_CONSTANTS"
import {updateItem} from "./update"
import { World } from "@cucumber/cucumber";

let response: APIResponse

class List{
    
    constructor() {
        console.log("Constructor for List");
    }
    
    /**
    * Function to calculate count of items in the list
    * @returns count of the items in the list
    */
    async getCurrentListCount(worldObject:World){
        worldObject.attach("Calling API - " + URI.LIST_TODO_LIST)
        response = await context.get(URI.LIST_TODO_LIST);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        let data = JSON.parse((await response.body()).toString()); 
        worldObject.attach("Current list count is " + data.length)
        return data.length;
    }

    /**
    * Marks all items in the list as completed
    * 
    */
    async emptyList(worldObject:World){
        
        worldObject.attach("Calling API - " + URI.LIST_TODO_LIST)
        response = await context.get(URI.LIST_TODO_LIST);
        //console.log("Response THEN - " + JSON.stringify(response))
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        let data = JSON.parse((await response.body()).toString()); 
        worldObject.attach("Current list count is " + data.length)
        if(data.length > 0){
            worldObject.attach("List contains "+data.length+" objects")
            data.forEach(function(obj: any) { 
                worldObject.attach("Marking object complete - " + JSON.stringify(obj))
                obj.isCompleted = true;
                updateItem.markComplete(worldObject,obj);
            });
        }else{
            worldObject.attach("List is empty")
        }
        
    }

    /**
    * Lists items for a given ID
    * @returns the item with specified ID
    */
    async listItem(worldObject:World,itemID:string){
        worldObject.attach("Listing item with id " + itemID)
        worldObject.attach("API - " + URI.LIST_TODO_ITEM+itemID)
        response = await context.get(URI.LIST_TODO_ITEM+itemID);
        return response;
    }

    /**
    * Lists all items
    * @returns the list of item
    */
    async listAll(worldObject:World){
        worldObject.attach("Listing All items")
        worldObject.attach("API - " + URI.LIST_TODO_LIST)
        response = await context.get(URI.LIST_TODO_LIST);
        return response;
    }
}

export const listItem = new List();