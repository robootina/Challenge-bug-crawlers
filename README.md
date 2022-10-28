# Challenge-bug-crawlers

## Try it out!

1. Clone repository
1. Copy the .apk file to the apps folder
1. Execute `npm install`
1. Configure your mobile device by making a copy of `config/wdio.gA52.device.android.app.conf.ts` and changing accordingly.
1. In package.json add a script to run the test using the config file you created in the last step. You can use the ga52.video and ga52.file scripts as example
1. Execute the scripts. Examples:
    1. Execute `npm run ga52.file` to execute the test to verify a document
    1. Execute `npm run ga52.video` to execute the test to verify a video

The test: `tests/specs/app.checkfiles.spec.ts` will fail for page 1 as the expected image was modified on purpose so show the test failes and to show the generated file shows the difference between the actual state of the file vs. the expected one. (see the reports folder)

## Demo and Presentation

Please visit this [Google Drive folder](https://drive.google.com/drive/folders/1kg0q3PysL25ocCfbvO84bp_5ZDrkpDIv?usp=share_link)
