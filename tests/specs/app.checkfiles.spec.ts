import { getSupportedCodeFixes } from "typescript";

describe("Navigate to a file", () => {
    beforeEach(async () => {});

    it("should be able to access a document", async () => {
        await $("~NEXT").waitForDisplayed({
            timeout: 20000,
        });

        await $("~NEXT").click();
        await $("~Americas").click();
        await $("~United States").click();
        await $("~SELECT REGION").click();

        await $("~Architect").click();
        await $("~START USING THE APP").click();

        await $("~CONTINUE").click();
        await $("~CONTINUE").click();
        await $("~CONTINUE").click();

        const firstFeaturePanelLocaltor = locatorStrategy(
            "FEATURE!\nChange Settings\nYou can change your region by going to the MORE menu and choosing the option that suits your needs.\nFEATURE!\nMy Files\nYou can add documents and review them in the My Files section.\nFEATURE!\nMore menu\nHere you can find some useful content such as Find a Contractor/Sales Rep.\nFEATURE!\nLog In\nLog in and discover more features related to your role.\nDONE"
        );
        await $(firstFeaturePanelLocaltor).click();

        const screenSize = await driver.getWindowSize();
        const elementLocation = await (
            await $(firstFeaturePanelLocaltor)
        ).getLocation();
        const elementSize = await (
            await $(firstFeaturePanelLocaltor)
        ).getSize();

        console.log(elementLocation); // outputs: { x: 0, y: 864 }
        console.log(elementSize); // outputs: { width: 1080, height: 1322 }
        console.log(screenSize); // outputs: { width: 1080, height: 2186 }

        const xPercentage = (925 * 100) / 1080;
        const yPercentage = (2160 * 100) / 2186;

        const { width, height } = await driver.getWindowSize();
        const x = (width * xPercentage) / 100;
        const y = (height * yPercentage) / 100;

        await driver.touchAction({
            action: "tap",
            x,
            y,
        });

        const secondFeaturePanelLocator = locatorStrategy(
            "NEW!\nSearch by voice!\nLook for the document needed just saying a keyword!\nDONE"
        );
        await $(secondFeaturePanelLocator).waitForDisplayed({
            timeout: 20000,
        });

        await driver.touchAction({
            action: "tap",
            x,
            y,
        });

        await $("~Technical Information Sheets").click();
        await $("~Insulation").click();
        await $("~Polyiso Board").click();
        await $(
            "~APR\n2022\nTIS 901A - ISO 95+ GL\nProduct: Insulation, Asphalt, TPO, EPDM, PVC\nType: Technical Information Sheets (TIS)\nLanguage: EN"
        ).click();
        await $("~TIS 901A - ISO 95+ GL").waitForDisplayed({
            timeout: 20000,
        });
        //TODO remove pause and find an element to wait for
        await driver.pause(5000);
        //TODO get path from a const or config
        let screenshot = await driver.saveScreenshot("./screenshots/pdf1.png");
        console.log(screenshot);
        //TODO include image check module
    });
});

function magic(location) {
    // do a horizontal swipe by percentage
    const startPercentage = 10;
    const endPercentage = 90;
    const anchorPercentage = 50;

    const { width, height } = driver.getWindowSize();
    const anchor = (height * anchorPercentage) / 100;
    const startPoint = (width * startPercentage) / 100;
    const endPoint = (width * endPercentage) / 100;
    driver.touchPerform([
        {
            action: "press",
            options: {
                x: startPoint,
                y: anchor,
            },
        },
        /*{
            action: "wait",
            options: {
                ms: 100,
            },
        },
        {
            action: "moveTo",
            options: {
                x: endPoint,
                y: anchor,
            },
        },*/
        {
            action: "release",
            options: {},
        },
    ]);
}

const locatorStrategy = (selector: string): string => {
    return driver.isIOS ? `id=${selector}` : `//*[@content-desc="${selector}"]`;
};
