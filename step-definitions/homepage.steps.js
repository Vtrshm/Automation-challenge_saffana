const { Given, When, Then } = require('@wdio/cucumber-framework');
const fs = require('node:fs/promises');
const path = require('node:path');
const HomePage = require('../pageobjects/HomePage');

let tabs = [];

Given('the 99.co app is open', async () => {
    console.log('99.co app session started.');
});

When('I scan the homepage UI', async () => {
    await HomePage.captureUiHierarchy();
    tabs = await HomePage.getBottomNavigationTabs();
});

Then('the homepage UI hierarchy should be saved', async () => {
    const filePath = path.join(
        process.cwd(),
        'artifacts',
        'homepage-source.xml'
    );

    const source = await fs.readFile(filePath, 'utf8');

    if (!source.trim()) {
        throw new Error('Homepage UI hierarchy is empty');
    }

    if (tabs.length === 0) {
        throw new Error('No bottom navigation tabs were checked');
    }

    const missingTabs = tabs
        .filter(tab => !tab.exists)
        .map(tab => tab.name);

    if (missingTabs.length > 0) {
        throw new Error(
            `Navigation tabs not found: ${missingTabs.join(', ')}`
        );
    }

    console.log(`PASS: UI hierarchy saved. ${tabs.length} navigation tabs found.`);
});