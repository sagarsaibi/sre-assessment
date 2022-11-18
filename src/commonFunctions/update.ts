
import {context} from "../../cucumber.conf"
import { APIResponse, expect } from "@playwright/test";
import * as URI  from "../support/URI_CONSTANTS"

let response: APIResponse

class Update{

    constructor() {
        console.log("Constructor called for update");
    }

    /**
    * Mark item as completed for a specified ID
    * 
    */
    async markComplete(obj: any) {
        //console.log("Calling mark complete  " + JSON.stringify(obj))
        response = await context.put(URI.UPDATE_TODO_ITEM + obj.id, {
            data: {
                "id" : obj.id,
                "description" : obj.description,
                "isCompleted" : obj.isCompleted
            },
        });

    }

    /**
    * Update description to a specified value for the item with specified ID
    * @returns the reponse of PUT API call
    */
    async updateDecription(id:string,desc:string,status:boolean) {
        console.log("Modifying object with ID  " + id)
        console.log("Updating description to   " + desc)
        response = await context.put(URI.UPDATE_TODO_ITEM + id, {
            data: {
                "id" : id,
                "description" : desc,
                "isCompleted" : status
            },
        });

        return response;

    }

    /**
    * Update status to a specified status for the item with specified ID
    * @returns the reponse of PUT API call
    */
    async updateStatus(id:string,status:boolean) {
        console.log("Modifying object with ID  " + id)
        console.log("Updating status to   " + status)
        response = await context.put(URI.UPDATE_TODO_ITEM + id, {
            data: {
                "id" : id,
                "description" : "desc",
                "isCompleted" : status
            },
        });

        return response;

    }

}

export const updateItem = new Update();

