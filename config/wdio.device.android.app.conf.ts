import { join } from "path";
import config from "./wdio.shared.local.appium.conf";

// ============
// Specs
// ============
config.specs = ["./tests/specs/**/app*.spec.ts"];

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
    {
        path: "/wd/hub",
        // The defaults you need to have in your config
        platformName: "Android",
        maxInstances: 1,
        // For W3C the appium capabilities need to have an extension prefix
        // http://appium.io/docs/en/writing-running-appium/caps/
        // This is `appium:` for all Appium Capabilities which can be found here
        "appium:deviceName": "R58R822DHNK",
        "appium:platformVersion": "12",
        "appium:orientation": "PORTRAIT",
        "appium:automationName": "UiAutomator2",

        // The path to the app
        "appium:app": join(process.cwd(), "./apps/Elevate-1.0.apk"),
        // @ts-ignore
        "appium:appPackage": "com.zemoga.fsbp",
        "appium:appWaitActivity": "com.holcimbe.technical.MainActivity",
        "appium:newCommandTimeout": 240,
        //"appium:autoAcceptAlerts": true,
        "appium:autoGrantPermissions": true,
    },
];

exports.config = config;
