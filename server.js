// HTTP Request
const got = require('got');
// HTML Parser
const cheerio = require('cheerio');
// Persistent Storage
const fs = require('fs');

// URL to get
const NOMAD_URL = 'https://nomadlist.com/{YOUR_USERNAME}';
// Location to write
const save = '/var/www/html/data/whereami.html'
// Selector to find
const selector = '.location';

got(NOMAD_URL).then((response) => {
	if(response.statusCode !== 200)
		return;
	const bod = response.body;
	const $ = cheerio.load(bod);
	// You can only get the children of the element - so mock the parent
	const prefix = `<div class="${selector.replace(/\./g,'')}">`;
	const suffix = '</div>';

	return prefix + $(selector).html() + suffix;
}).then((data) => fs.writeFile(save, data));