export default class AppScreen {
    private selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }

    /**
     * Wait for class' main element to be visible
     *
     * @param {boolean} isShown
     */
    async waitForIsShown(isShown = true): Promise<boolean | void> {
        return $(this.selector).waitForDisplayed({
            reverse: !isShown,
            timeout: 20000,
        });
    }

    /**
     * Get element based on content-desc
     */
    locatorStrategy(selector: string): string {
        return driver.isIOS
            ? `id=${selector}`
            : `//*[@content-desc="${selector}"]`;
    }

    /**
     * Get element based on content-desc
     */
    contentDescContains(selector: string): string {
        return `//*[contains(@content-desc,'${selector}') or contains(@id,'${selector}')]`;
    }
}
