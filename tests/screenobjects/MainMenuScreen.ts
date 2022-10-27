import AppScreen from "./AppScreen";

class MainMenu extends AppScreen {
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
    async selectTechnicalInfoSheets() {
        await this.technicalInfoSheetsButton.click();
    }
}

export default new MainMenu();
