import StartUp from "../screenobjects/StartupScreen";
import MainMenu from "../screenobjects/MainMenuScreen";
import ExtraMenu from "../screenobjects/ExtraMenuScreen";
import MediaCenter from "../screenobjects/MediaCenterScreen";
import FILE_DATA from "../../data/testFiles.json";
import * as fs from "fs";

const PNG = require("pngjs").PNG;
const pixelmatch = require("pixelmatch");

describe("Validate videos are being played correctly from the app", () => {
    beforeEach(async () => {});
    it("should be able to access a media center and play a video", async () => {
        const videoPlaylist = FILE_DATA.videoPlaylists.ACCESSORIES;
        //TODO get this from config
        let caseName = "current";
        const reportFolder = `./reports/${caseName}`;
        await StartUp.waitForIsShown();
        await StartUp.navigateToMainScreen();
        await MainMenu.openExtraMenu();
        await ExtraMenu.openMediaCenter();
        await MediaCenter.openPlayList(videoPlaylist.id);
        const videoData = videoPlaylist.videos[0];
        await MediaCenter.openVideo(videoPlaylist.videos[0], true);

        //TODO investigate a wat to ensure the video is playing instead of pause
        await driver.pause(5000);

        let path = `./screenshots/video/current`;
        createDirectoryIfNotExist(path);
        let currentSecond = 2000;
        let screenshotFileNames = [];
        while (currentSecond < videoData.totalMinutes * 1000) {
            await driver.pause(currentSecond);
            currentSecond + 2000;
            let filename = `test${currentSecond}.png`;
            MediaCenter.takeScreenshot(`${path}/${filename}`);
            screenshotFileNames.push(filename);
        }
        let index = 0;
        while (index < screenshotFileNames.length) {
            let fileName = screenshotFileNames[index];
            if (screenshotFileNames[index + 1]) {
                let fileName2 = screenshotFileNames[index + 1];
                ++index;
                const imgActual = PNG.sync.read(
                    fs.readFileSync(`${path}/${fileName}`)
                );
                const imgExpected = PNG.sync.read(
                    fs.readFileSync(`${path}/${fileName2}`)
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
                    console.log(`\n\nVideo image did not change from one screenshot to another!
                    Failing test case!\n\n`);
                    expect(pixelNumber).toEqual(0);
                }
            }
        }
    });
});

function createDirectoryIfNotExist(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
}
