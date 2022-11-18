
import {context} from "../../cucumber.conf"
import { APIResponse, expect } from "@playwright/test";
import * as URI  from "../support/URI_CONSTANTS"
import {common} from "../commonFunctions/common"

let response: APIResponse

class Create{

    constructor() {
        console.log("Constructor for Create");
    }


    /**
    * Create randome todo item
    * @returns ID of the Item created
    */
    async createRandomItem() {
        response = await context.post(URI.CREATE_TODO_ITEM, {
            data: {
                "description" : common.generateRandomDesc(),
            },
        });

        //Item creation successful
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(201);
        let data = JSON.parse((await response.body()).toString());
        return data;
    }

    
    /**
    * Create items with specified description
    * @returns reponse of the POST API call to create item
    */
    async createItemWithDesc(desc:string) {
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
    async createItemWithoutDesc() {
        response = await context.post(URI.CREATE_TODO_ITEM, {
            data: {
                "description" : "",
            },
        });

        return response;
    }
}

export const createItem = new Create();