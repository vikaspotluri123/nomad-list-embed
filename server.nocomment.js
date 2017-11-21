const got = require('got');
const cheerio = require('cheerio');
const fs = require('fs');

const NOMAD_URL = 'https://nomadlist.com/{YOUR_USERNAME}';
const save = '/var/www/html/data/whereami.html'
const selector = '.location';

got(NOMAD_URL).then((response) => {
	if(response.statusCode !== 200)
		return;
	const bod = response.body;
	const $ = cheerio.load(bod);
	const prefix = `<div class="${selector.replace(/\./g,'')}">`;
	const suffix = '</div>';

	return prefix + $(selector).html() + suffix;
}).then((data) => fs.writeFile(save, data));