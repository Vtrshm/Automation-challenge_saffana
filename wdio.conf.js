exports.config = {
    runner: 'local',
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    specs: ['./features/**/*.feature'],
    framework: 'cucumber',
    reporters: ['spec'],

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'emulator-5554',
        'appium:udid': 'emulator-5554',
        'appium:appPackage': 'com.urbanindo.android',
        'appium:noReset': true
    }],

    cucumberOpts: {
        require: ['./step-definitions/**/*.js'],
        timeout: 120000
    },

    maxInstances: 1
};