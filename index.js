var reporter = require('cucumber-html-reporter');

var options = {
        theme: 'bootstrap',
        jsonFile: 'report/json/cucumber_report.json',
        output: 'report/cucumber_report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        brandTitle: "ClearPoint",
        columnLayout:1,
        metadata: {
            "App Version":"1.0.0",
            "Test Environment": "Dev",
            "Platform": "macos Ventura",
            "Parallel": "Scenarios",
            "Executed": "Local"
        }
    };

    reporter.generate(options);