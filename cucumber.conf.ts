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


After(async function () {
    const userDetails = Buffer.from(JSON.stringify("Shared.userDetails"));
    //this.log("Logging from after hook")
    this.attach("Logging from after hook")
    //await this.World.attach(userDetails, 'application/json');
    const testData = Buffer.from(JSON.stringify("Shared.testDataObj"));
    //await this.World.attach(testData, 'application/json');
});