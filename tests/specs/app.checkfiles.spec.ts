import { getSupportedCodeFixes, isAssertClause } from "typescript";
import StartUp from "../screenobjects/StartupScreen";
import TISMenu from "../screenobjects/TISMenuScreen";
import DocumentScreen from "../screenobjects/DocumentScreen";
import FILE_DATA from "../../data/testFiles.json";
import * as fs from "fs";

const PNG = require("pngjs").PNG;
const pixelmatch = require("pixelmatch");

describe("Navigate to a file", () => {
    beforeEach(async () => {});

    it("should be able to access a Technicall Info Sheet document", async () => {
        /**
         * Set test mode to check actual documents vs expected
         * Record mode to set expected images
         */
        const TEST_MODE = "actual";
        const RECORD_MODE = "expected";
        let CURRENT_MODE = TEST_MODE;
        const caseName = "case1";
        const deviceName = "testDevice"; //TODO get this from config
        const documentDataObj = FILE_DATA.documents[caseName];

        await StartUp.waitForIsShown();

        await StartUp.navigateToMainScreen();

        await TISMenu.selectByFileData(documentDataObj);

        //TODO need to add folder for device

        let actualScreenshotPath = `./screenshots/${TEST_MODE}/${caseName}/${deviceName}/`;
        let expectedScreenshotPath = `./screenshots/${RECORD_MODE}/${caseName}/${deviceName}/`;

        let screenshotPath = actualScreenshotPath;

        //expected folder should exist, else we cannot compare images
        let expectedFolderExists = fs.existsSync(expectedScreenshotPath);
        if (!expectedFolderExists) {
            CURRENT_MODE = RECORD_MODE;
            createDirectoryIfNotExist(expectedScreenshotPath);
            screenshotPath = expectedScreenshotPath;
        } else {
            //create directory where actual images will be stored if not exist
            createDirectoryIfNotExist(screenshotPath);
        }

        let screenshotsTaken = [];
        for (let page = 1; page <= documentDataObj.pages; page++) {
            let filename = `pdf${page}.png`;
            let screenshotFilePath = screenshotPath + filename;
            screenshotsTaken.push(filename);
            if (page > 1) {
                await DocumentScreen.swipe();
            }

            await DocumentScreen.takeScreenshot(screenshotFilePath);
        }

        console.log("Screenshots taken!", screenshotsTaken);

        if (!expectedFolderExists) {
            console.log(
                `EXPECTED images for this test were created. Make sure these reflect the expected look. Please re-run test`
            );
            expect(expectedFolderExists).toBeTruthy();
            return;
        }

        if (CURRENT_MODE === TEST_MODE) {
            //TODO get this from config
            const reportFolder = `./reports/${caseName}`;
            let failedImages = [];
            for (let fileName of screenshotsTaken) {
                const imgActual = PNG.sync.read(
                    fs.readFileSync(`${actualScreenshotPath}/${fileName}`)
                );
                const imgExpected = PNG.sync.read(
                    fs.readFileSync(`${expectedScreenshotPath}/${fileName}`)
                );
                const { width, height } = imgActual;
                const diff = new PNG({ width, height });

                let pixelNumber = pixelmatch(
                    imgActual.data,
                    imgExpected.data,
                    diff.data,
                    width,
                    height,
                    {
                        threshold: 0.1,
                    }
                );

                if (pixelNumber > 0) {
                    //pixelNumber is higher than zero hence there is a difference
                    createDirectoryIfNotExist(reportFolder);
                    fs.writeFileSync(
                        `${reportFolder}/diff${fileName}`,
                        PNG.sync.write(diff)
                    );
                    //TODO convert this to object so each image has a failure %
                    failedImages.push(fileName);
                }
            }
            let numFailedPages = failedImages.length;
            if (numFailedPages > 0) {
                console.log(
                    `
                    
                    =================================
                    Document ${documentDataObj.title} has differences on ${numFailedPages} pages!!
                    Please check ${reportFolder} to see the differences.
                    =================================
                    
                    `
                );
            }
            expect(numFailedPages).toEqual(0);
        }
    });
});

function createDirectoryIfNotExist(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
}
