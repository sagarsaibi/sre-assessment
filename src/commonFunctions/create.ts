
import {context} from "../../cucumber.conf"
import { APIResponse, expect } from "@playwright/test";
import * as URI  from "../support/URI_CONSTANTS"
import {common} from "../commonFunctions/common"
import { World } from "@cucumber/cucumber";

let response: APIResponse

class Create{

    constructor() {
        console.log("Constructor for Create");
    }


    /**
    * Create randome todo item
    * @returns ID of the Item created
    */
    async createRandomItem(worldObject:World) {
        worldObject.attach("Calling API - " + URI.CREATE_TODO_ITEM)
        var desc = common.generateRandomDesc()
        worldObject.attach("Creating object with description " + desc)
        response = await context.post(URI.CREATE_TODO_ITEM, {
            data: {
                "description" : desc,
            },
        });

        //Item creation successful
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(201);
        worldObject.attach("Item created successfully")
        let data = JSON.parse((await response.body()).toString());
        return data;
    }

    
    /**
    * Create items with specified description
    * @returns reponse of the POST API call to create item
    */
    async createItemWithDesc(worldObject:World,desc:string) {
        worldObject.attach("Calling API - " + URI.CREATE_TODO_ITEM)
        worldObject.attach("Creating object with description " + desc)
        response = await context.post(URI.CREATE_TODO_ITEM, {
            data: {
                "description" : desc,
            },
        });

        return response;
    }

    
    /**
    * Create item without any description
    * @returns reponse of the POST API call to create item
    */
    async createItemWithoutDesc(worldObject:World) {
        worldObject.attach("Calling API - " + URI.CREATE_TODO_ITEM)
        worldObject.attach("Creating object WITHOUT description ")
        response = await context.post(URI.CREATE_TODO_ITEM, {
            data: {
                "description" : "",
            },
        });

        return response;
    }
}

export const createItem = new Create();