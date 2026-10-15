const XmlHelper = require('./XmlHelper');

const xml = '<App><Screen name="Home" /></App>';
const result = XmlHelper.parse(xml);

if (result.App.Screen['@_name'] !== 'Home') {
    throw new Error('XML parsing test failed');
}

console.log('PASS: XML parsing berjalan dengan benar');
