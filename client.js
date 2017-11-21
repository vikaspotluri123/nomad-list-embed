document.addEventListener('DOMContentLoaded', function () {
	// Where are you serving the parsed location info?
	const NL_PATH = '/whereami.html';
	// What's your nomadlist username
	const NL_USERNAME = 'yourUsername';
	// What selector do you want to drop location info in?
	const NL_SELECTOR = '.location'

	// Creating a fully qualified URL
	const srcLoc = window.location.origin + NL_PATH;

	function nomadResponse (payload) {
		// Split by links (because nomadList uses links in location)
		const locations = payload.split(/<a href="[a-zA-Z-/]{0,}">/);
		// Default location is unknown; remove trailing html
		const retVal = {current: (locations[1] || 'Unknown').split('</a>')[0]};

		// This exists if you're going somewhere in the future
		if(locations[2]) {
			retVal.next = {
				// Remove trailing html
				location: locations[2].split('</a>')[0],
				// number of days before you travel to next location
				time: (payload.split('</a>').pop()).split('in ')[1].split('</')[0].split('d')[0]
			};
		}
		return Promise.resolve(retVal);
	}

	function updateLocation (loc) {
		// Entire text block links to your profile
		let location = `<a href="https://nomadlist.com/${NL_USERNAME}">${loc.current}`;

		// Add future travel info to block
		if(loc.next && loc.next.location && loc.next.time && Number(loc.next.time) >= 0) {
			loc.next.time += Number(loc.next.time) == 1 ? ' day' : ' days';
			loc += `. Traveling to ${loc.next.location} in ${loc.next.time}`;
		}

		location += '</a>';

		// Set the HTML of every selector to the calculated location info
		document.querySelectorAll(NL_SELECTOR).forEach((elem) => elem.innerHTML = location);
	}

	fetch(srcLoc)
		// Check headers - `response.ok` checks if the response value is 2**
		.then((response) => response.ok ? true : Promise.reject(response.statusText))
		// Get response as json object
		.then((response) => response.text())
		// Parse response
		.then(nomadResponse)
		// Build the html and load
		.then(updateLocation);
});