
import {context} from "../../cucumber.conf"
import { APIResponse, expect } from "@playwright/test";
import * as URI  from "../support/URI_CONSTANTS"
import {updateItem} from "./update"

let response: APIResponse

class List{

    constructor() {
        console.log("Constructor called list");
    }

    async getCurrentListCount(){
        response = await context.get(URI.LIST_TODO_LIST);
        console.log("Response THEN - " + JSON.stringify(response))
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        let data = JSON.parse((await response.body()).toString()); 
        //return response.body();
        console.log("Printing data - " + JSON.stringify(data))
        console.log("Printing data of [0] - " + data.length)
        return data.length;
    }

    async emptyList(){
        response = await context.get(URI.LIST_TODO_LIST);
        //console.log("Response THEN - " + JSON.stringify(response))
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        let data = JSON.parse((await response.body()).toString()); 
        //console.log("Printing data of [0] - " + data.length)
        if(data.length > 0){
            console.log("LIST CONTAINS OBJECTS")
            data.forEach(function(obj: any) { 
                //console.log("PRINTING EACH OBJECT" + JSON.stringify(obj));
                //console.log("PRINTING EACH OBJECT" + obj.isCompleted); 
                obj.isCompleted = true;
                updateItem.markComplete(obj);
                //console.log("PRINTING MODIFIED OBJECT" + JSON.stringify(obj));
            });
        }else{
            console.log("LIST IS ALREADY EMPTY")
        }
        return data.length;
    }

    async listItem(itemID:string){
        response = await context.get(URI.LIST_TODO_ITEM+itemID);
        console.log("Response LIST ITEM - " + JSON.stringify(response))
        //expect(response.ok()).toBeTruthy();
        //expect(response.status()).toBe(200);
        // let data = JSON.parse((await response.body()).toString()); 
        // //return response.body();
        // console.log("Printing data - " + JSON.stringify(data))
        // console.log("Printing data of [0] - " + data.length)
        return response;
    }

    async listAll(){
        response = await context.get(URI.LIST_TODO_LIST);
        console.log("Response LIST ITEM - " + JSON.stringify(response))
        return response;
    }

}

export const listItem = new List();