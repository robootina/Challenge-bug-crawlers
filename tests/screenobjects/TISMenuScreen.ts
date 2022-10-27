import AppScreen from "./AppScreen";
/**
 * Technical Information Sheets
 */
class TISMenu extends AppScreen {
    constructor() {
        super("~Technical Information Sheets");
    }

    /**
     * define elements
     */
    get insulationButton() {
        return $("~Insulation");
    }
    get PolysioBoardButton() {
        return $("~Polyiso Board");
    }

    /**
     * define methods
     */

    /**
     * Given a file data object set in ./data, navigate to it
     */
    async selectByFileData(fileData: any) {
        const selectors = fileData.path.split("/");
        for (let selector of selectors) {
            await $(`~${selector}`).click();
        }
        await $(`~${fileData.id}`).click();
        await $(`~${fileData.title}`).waitForDisplayed({
            timeout: 20000,
        });
        //TODO remove pause and find an element to wait for
        await driver.pause(5000);
    }
}

export default new TISMenu();
