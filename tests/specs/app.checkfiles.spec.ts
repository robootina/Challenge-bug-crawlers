import { getSupportedCodeFixes } from "typescript";
import StartUp from "../screenobjects/StartupScreen";
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
            screenshots.push(screenshot);
            if (page > 1) await magic();
            const elem = await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View/android.widget.ImageView');
            await elem.saveScreenshot(screenshot);
        }

        console.log("Screenshots taken!", screenshots);

        if (CURRENT_MODE === TEST_MODE) {
            console.log("test....");
            //TODO include image check module
        }
    });
});

async function magic() {
    // do a vertical swipe by percentage
    const startPercentage = 20;
    const endPercentage = 90;
    const anchorPercentage = 50;

    const { width, height } =  await driver.getWindowSize();
    const anchor = (width * anchorPercentage) / 100;
    const endPoint = (height * startPercentage) / 100;
    const startPoint = (height * endPercentage) / 100;
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
                ms: 1000,
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
