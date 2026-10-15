const { Given, When, Then } = require('@wdio/cucumber-framework');
const fs = require('node:fs/promises');
const path = require('node:path');
const HomePage = require('../pageobjects/HomePage');

Given('the 99.co app is open', async () => {
    console.log('99.co app session started.');
});

When('I scan the homepage UI', async () => {
    await HomePage.captureUiHierarchy();
});

Then('the homepage UI hierarchy should be saved', async () => {
    const filePath = path.join(process.cwd(), 'artifacts', 'homepage-source.xml');
    const source = await fs.readFile(filePath, 'utf8');

    if (!source.trim()) {
        throw new Error('Homepage UI hierarchy is empty');
    }

    console.log('PASS: Homepage UI hierarchy saved.');
});