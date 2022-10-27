import AppScreen from "./AppScreen";

class StartUp extends AppScreen {
    constructor() {
        super("~NEXT");
    }

    /**
     * define elements
     */
    get nextButton() {
        return $("~NEXT");
    }
    get regionAmericasButton() {
        return $("~Americas");
    }
    get countryUnitedStatesButton() {
        return $("~United States");
    }
    get selectRegionButton() {
        return $("~SELECT REGION");
    }
    get profileArchitectButton() {
        return $("~Architect");
    }
    get startButton() {
        return $("~START USING THE APP");
    }
    get continueButton() {
        return $("~CONTINUE");
    }

    /**
     * define methods
     */
    async navigateToMainScreen(profile: object = {}) {
        //TODO select options based on profile object where the region, profile will be set

        await this.nextButton.click();

        //select region/country
        await this.regionAmericasButton.click();
        await this.countryUnitedStatesButton.click();
        await this.selectRegionButton.click();

        //select profile
        await this.profileArchitectButton.click();
        await this.startButton.click();

        //click continue on all intro screens
        await this.continueButton.click();
        await this.continueButton.click();
        await this.continueButton.click();

        //here a panel showing app info is shown, need to tab by coordinates as element is not clickable

        //calculate percentages based on sample screen size 1080x2186, use showElementLocation() for debugging
        const xPercentage = (925 * 100) / 1080;
        const yPercentage = (2160 * 100) / 2186;
        const { width, height } = await driver.getWindowSize();
        //calculate coordinates on current size
        const x = (width * xPercentage) / 100;
        const y = (height * yPercentage) / 100;
        await driver.touchAction({
            action: "tap",
            x,
            y,
        });

        //the last panel takes time to load hence the waitForDisplayed
        //TODO a better locator can be used
        const secondFeaturePanelLocator = this.locatorStrategy(
            "NEW!\nSearch by voice!\nLook for the document needed just saying a keyword!\nDONE"
        );
        await $(secondFeaturePanelLocator).waitForDisplayed({
            timeout: 20000,
        });

        //tap by cooridnates for second final on same coordinates as the first one
        await driver.touchAction({
            action: "tap",
            x,
            y,
        });
    }
    /**
     * To be used to debug position of last intro panels that are not clickable to get the correct coordinates
     */
    async showElementLocation() {
        const firstFeaturePanelLocaltor = this.locatorStrategy(
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
    }
}

export default new StartUp();
