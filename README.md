# SRE Assesment
This is API automation built with Cucumber for BDD, Playwright for API calls and Allure for reporting

## Pre-requisite
Install Node.js and Typescript on your machine

## Usage

Clone the repository and run the following command:

```sh
npm install
```

## Run tests

```sh
npm test
```

Then, to open report run the following command:

```sh
npm run report
```

It will open default browser and open the HTML report


## Run with tags (optionally)

Command to run with tags: ### npm test -- --tags <tagname>    

```sh
    @smoke - Run basic scenarios for all actions (Create,List,Update)
    @positive - Run all positve scenarios
    @negative - Run all negative scenarios
    @create - Run all scenarios for creating item(s)
    @list - Run all scenarios for listing item(s)
    @update - Run all scenarios for updating item
```
