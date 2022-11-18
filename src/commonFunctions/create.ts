
import {context} from "../../cucumber.conf"
import { APIResponse, expect } from "@playwright/test";
import * as URI  from "../support/URI_CONSTANTS"
import {updateItem} from "./update"
import {common} from "../commonFunctions/common"

let response: APIResponse

class Create{

    constructor() {
        console.log("Constructor called Create");
    }

    async createRandomItem() {
        response = await context.post(URI.CREATE_TODO_ITEM, {
            data: {
                "description" : common.generateRandomDesc(),
            },
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(201);
        let data = JSON.parse((await response.body()).toString());
        return data;
    }

    async createItemWithDesc(desc:string) {
        response = await context.post(URI.CREATE_TODO_ITEM, {
            data: {
                "description" : desc,
            },
        });

        return response;
    }
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