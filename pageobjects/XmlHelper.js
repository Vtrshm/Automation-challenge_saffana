const { XMLParser } = require('fast-xml-parser');

class XmlHelper {
    parse(xmlSource) {
        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: '@_'
        });

        return parser.parse(xmlSource);
    }
}

module.exports = new XmlHelper();