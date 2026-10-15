
const fs = require('node:fs/promises');
const path = require('node:path');
const XmlHelper = require('./XmlHelper');

async function main() {
    const inputFile = process.argv[2] || 'sample-homepage.xml';

    const inputPath = path.join(
        process.cwd(),
        'artifacts',
        inputFile
    );

    const outputPath = path.join(
        process.cwd(),
        'artifacts',
        'homepage-summary.json'
    );

    const xml = await fs.readFile(inputPath, 'utf8');
    const parsed = XmlHelper.parse(xml);
    const screen = parsed.App.Screen;

    const asArray = value => {
        if (!value) return [];
        return Array.isArray(value) ? value : [value];
    };

    const summary = {
        screen: screen['@_name'] || 'Unknown',
        texts: asArray(screen.Text).map(item => item['@_name']),
        buttons: asArray(screen.Button).map(item => item['@_name'])
    };

    await fs.writeFile(
        outputPath,
        JSON.stringify(summary, null, 2),
        'utf8'
    );

    console.log('Ringkasan tersimpan:', outputPath);
    console.log(JSON.stringify(summary, null, 2));
}

main().catch(error => {
    console.error('Gagal membaca XML:', error.message);
    process.exitCode = 1;
});
