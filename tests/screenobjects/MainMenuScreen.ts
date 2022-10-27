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
    async openExtraMenu() {
        await $("~MORE\nTab 3 of 3").click();
    }
}

export default new MainMenu();
