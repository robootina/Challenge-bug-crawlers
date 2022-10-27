import AppScreen from "./AppScreen";
/**
 * Technical Information Sheets
 */
class ExtraMenu extends AppScreen {
    constructor() {
        super("~Media Center");
    }

    /**
     * define elements
     */
    get optionMediaCenterButton() {
        return $("~Media Center");
    }

    /**
     * define methods
     */

    /**
     * Open media center
     */
    async openMediaCenter() {
        await this.optionMediaCenterButton.click();
    }
}

export default new ExtraMenu();
