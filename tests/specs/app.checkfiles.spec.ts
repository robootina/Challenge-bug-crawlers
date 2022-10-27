import { getSupportedCodeFixes } from "typescript";
import StartUp from "../screenobjects/StartupScreen";
import MainMenu from "../screenobjects/MainMenuScreen";
import TISMenu from "../screenobjects/TISMenuScreen";
import FILE_DATA from "../../data/testFiles.json";

/**
 * Set test mode to check actual documents vs expected
 * Record mode to set expected images
 */
const TEST_MODE = "actual";
const RECORD_MODE = "expected";
const CURRENT_MODE = TEST_MODE;

describe("Navigate to a file", () => {
    beforeEach(async () => {});

    it("should be able to access a Technicall Info Sheet document", async () => {
        const documentDataObj = FILE_DATA.documents.case1;

        await StartUp.waitForIsShown();

        await StartUp.navigateToMainScreen();

        await TISMenu.selectByFileData(documentDataObj);

        let screenshotPath = `./screenshots/${CURRENT_MODE}/`;

        let screenshots = [];
        for (let page = 1; page <= documentDataObj.pages; page++) {
            let screenshot = screenshotPath + `pdf${page}.png`;
            await driver.saveScreenshot(screenshot);
            screenshots.push(screenshot);
            if (page > 1) await magic(page);
        }

        console.log("Screenshots taken!", screenshots);

        if (CURRENT_MODE === TEST_MODE) {
            console.log("test....");
            //TODO include image check module
        }
    });
});

async function magic(page: number) {
    // do a vertical swipe by percentage
    const startPercentage = 20;
    const endPercentage = 90;
    const anchorPercentage = 50;

    const { width, height } = driver.getWindowSize();
    const anchor = (width * anchorPercentage) / 100;
    const startPoint = (height * startPercentage) / 100;
    const endPoint = (height * endPercentage) / 100;
    await driver.touchPerform([
        {
            action: "press",
            options: {
                x: anchor,
                y: startPoint,
            },
        },
        {
            action: "wait",
            options: {
                ms: 100,
            },
        },
        {
            action: "moveTo",
            options: {
                x: anchor,
                y: endPoint,
            },
        },
        {
            action: "release",
            options: {},
        },
    ]);
    //await driver.saveScreenshot(`./screenshots/pdf${page}.png`);
}
