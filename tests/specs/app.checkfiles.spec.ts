describe("Navigate to a file", () => {
    beforeEach(async () => {});

    it("should be able to access a document", async () => {
        $("~NEXT").waitForDisplayed({
            timeout: 20000,
        });

        await $("~NEXT").click();
        await $("~Americas").click();
        await $("~United States").click();
        await $("~SELECT REGION").click();

        await $("~Architect").click();
        await $("~START USING THE APP").click();
        //here is where the test fails, 1) Navigate to a file should be able to access a document [R58R822DHNK Android 12 #0-0] Invalid CSS selector 'com.android.permissioncontroller:id/permission_allow_one_time_button'. Reason: 'Error: Rule expected but "/" found.'
        /* await $(
            "com.android.permissioncontroller:id/permission_allow_one_time_button"
        ).click();*/
        await $("~CONTINUE").click();
        await $("~CONTINUE").click();
        await $("~CONTINUE").click();
        await $("~-DONE").click();
        await $("~DONE").click();
    });
});
