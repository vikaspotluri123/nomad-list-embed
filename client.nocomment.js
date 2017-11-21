document.addEventListener('DOMContentLoaded', function () {
	const NL_PATH = '/whereami.html';
	const NL_USERNAME = 'yourUsername';
	const NL_SELECTOR = '.location'

	const srcLoc = window.location.origin + NL_PATH;

	function nomadResponse (payload) {
		const locations = payload.split(/<a href="[a-zA-Z-/]{0,}">/);
		const retVal = {current: (locations[1] || 'Unknown').split('</a>')[0]};

		if(locations[2]) {
			retVal.next = {
				location: locations[2].split('</a>')[0],
				time: (payload.split('</a>').pop()).split('in ')[1].split('</')[0].split('d')[0]
			};
		}
		return Promise.resolve(retVal);
	}

	function updateLocation (loc) {
		let location = `<a href="https://nomadlist.com/${NL_USERNAME}">${loc.current}`;

		if(loc.next && loc.next.location && loc.next.time && Number(loc.next.time) >= 0) {
			loc.next.time += Number(loc.next.time) == 1 ? ' day' : ' days';
			loc += `. Traveling to ${loc.next.location} in ${loc.next.time}`;
		}

		location += '</a>';

		document.querySelectorAll(NL_SELECTOR).forEach((elem) => elem.innerHTML = location);
	}

	fetch(srcLoc)
		.then((response) => response.ok ? true : Promise.reject(response.statusText))
		.then((response) => response.text())
		.then(nomadResponse)
		.then(updateLocation);
});