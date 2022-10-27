import AppScreen from "./AppScreen";

class MediaCenter extends AppScreen {
    constructor() {
        super("~Technical Information Sheets");
    }

    /**
     * define elements
     */
    get technicalInfoSheetsButton() {
        return $("~Technical Information Sheets");
    }

    /**
     * define methods
     */

    /**
     * Open playlist based on its ID
     */
    async openPlayList(playlistID: string) {
        await $(`~${playlistID}`).waitForDisplayed({
            timeout: 20000,
        });
        await $(`~${playlistID}`).click();
    }
    /**
     * Open video based on its data
     */
    async openVideo(videoDataFile: any) {
        const videoTitleElem = await $(
            this.contentDescContains(videoDataFile.id)
        );

        await videoTitleElem.waitForDisplayed({
            timeout: 20000,
        });
        videoTitleElem.parent.touchClick();
    }
    /**
     * Play video based on its data
     */
    async playVideo(videoDataFile: any) {
        //calculate percentages based on sample screen size 1080x2186, use showElementLocation() for debugging
        const xPercentage = 50;
        const yPercentage = (460 * 100) / 2186;
        const { width, height } = await driver.getWindowSize();
        //calculate coordinates on current size
        const x = (width * xPercentage) / 100;
        const y = (height * yPercentage) / 100;
        await driver.touchAction({
            action: "tap",
            x,
            y,
        });
    }
}

export default new MediaCenter();
