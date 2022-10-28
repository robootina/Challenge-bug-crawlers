import AppScreen from "./AppScreen";
/**
 * Technical Information Sheets
 */
class DocumentScreen extends AppScreen {
    constructor() {
        super("");
    }

    /**
     * define elements
     */

    get documentFrame() {
        return $(
            "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View/android.widget.ImageView"
        );
    }
    /**
     * define methods
     */

    /**
     * Take screenshot
     */
    async takeScreenshot(path) {
        await this.documentFrame.saveScreenshot(path);
    }
    /**
     * swipe action to move from one page to another
     */
    async swipe() {
        // do a vertical swipe by percentage
        const startPercentage = 20;
        const endPercentage = 90;
        const anchorPercentage = 50;

        const { width, height } = await driver.getWindowSize();
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
    }
}

export default new DocumentScreen();
