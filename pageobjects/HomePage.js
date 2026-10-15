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
}

module.exports = new HomePage();