"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = void 0;
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
(0, cucumber_1.BeforeAll)(function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("BeforeAll function ");
        exports.context = yield test_1.request.newContext({
            baseURL: 'http://localhost:3002/',
            extraHTTPHeaders: {
                'content-type': "application/json;"
            },
        });
    });
});
(0, cucumber_1.After)(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const userDetails = Buffer.from(JSON.stringify("Shared.userDetails"));
        //this.log("Logging from after hook")
        this.attach("Logging from after hook");
        //await this.World.attach(userDetails, 'application/json');
        const testData = Buffer.from(JSON.stringify("Shared.testDataObj"));
        //await this.World.attach(testData, 'application/json');
    });
});
