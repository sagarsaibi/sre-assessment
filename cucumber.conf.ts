import { Before, BeforeAll, AfterAll, After, setDefaultTimeout } from "@cucumber/cucumber";
import { request,APIRequestContext } from "@playwright/test";

export let context: APIRequestContext
BeforeAll(async function () {
    console.log("BeforeAll function ")
    context = await request.newContext({
        baseURL: 'http://localhost:3002/',
        extraHTTPHeaders: {
            'content-type': "application/json;"
          },
    });
});