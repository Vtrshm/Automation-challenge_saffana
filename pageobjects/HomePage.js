const fs = require('node:fs/promises');
const path = require('node:path');

class HomePage {
    async captureUiHierarchy() {
        const source = await browser.getPageSource();

        const outputPath = path.join(
            process.cwd(),
            'artifacts',
            'homepage-source.xml'
        );

        await fs.mkdir(path.dirname(outputPath), {
            recursive: true
        });

        await fs.writeFile(outputPath, source, 'utf8');

        console.log('Homepage UI hierarchy saved:', outputPath);

        return source;
    }

    async getBottomNavigationTabs() {
        const tabNames = [
            'Cari',
            'Hunian Baru',
            'Iklan Saya',
            'Buat Iklan',
            'Akun Saya'
        ];

        const foundTabs = [];

        for (const name of tabNames) {
            const locator = await $(
                `android=new UiSelector().descriptionContains("${name}")`
            );

            const exists = await locator.isExisting();

            foundTabs.push({
                name,
                exists
            });

            console.log(
                `${exists ? 'FOUND' : 'NOT FOUND'}: ${name}`
            );
        }

        return foundTabs;
    }
}

module.exports = new HomePage();

