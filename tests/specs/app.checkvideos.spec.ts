import StartUp from "../screenobjects/StartupScreen";
import MainMenu from "../screenobjects/MainMenuScreen";
import ExtraMenu from "../screenobjects/ExtraMenuScreen";
import MediaCenter from "../screenobjects/MediaCenterScreen";
import FILE_DATA from "../../data/testFiles.json";

/**
 * Set test mode to check actual documents vs expected
 * Record mode to set expected images
 */
const TEST_MODE = "actual";
const RECORD_MODE = "expected";
const CURRENT_MODE = TEST_MODE;

describe("Validate videos are being played correctly from the app", () => {
    beforeEach(async () => {});

    it("should be able to access a media center and play a video", async () => {
        const videoPlaylist = FILE_DATA.videoPlaylists.ACCESSORIES;

        await StartUp.waitForIsShown();

        await StartUp.navigateToMainScreen();

        await MainMenu.openExtraMenu();

        await ExtraMenu.openMediaCenter();
        await MediaCenter.openPlayList(videoPlaylist.id);
        //TODO assert all videos are shown
        await MediaCenter.openVideo(videoPlaylist.videos[0]);
        //Still not working
        await MediaCenter.playVideo(videoPlaylist.videos[0]);
        await driver.pause(10000);
        await driver.pause(10000);
        //here iterate over specific minutes and take screenshot in each and compare
    });
});
