# Nomad List Embed

A universal wrapper to dynamically update your location based on your [Nomad List](https://nomadlist.com) profile

## Prerequisites

It's expected that your target demographic uses semi-modern browsers - as long as they support `document.querySelector` and `window.fetch`, everything should work well.

It's also expected you have access to a server to scrape NomadLists' site so you don't overwhelm their site.

## Installation

### Server

The server installation requires [node](https://nodejs.org) to be installed. Most versions should work, but don't quote me on that :smile:

- Save the server.js (or server.nocomment.js) file somewhere in your server - the setup I run has it saved in `~/bin/nomad.js`

- run `npm install got cheerio` in the folder the script is installed (so for me that was `~/bin`)

- make sure the `save` folder in server.{nocomment.}js exists - `mkdir -p /var/www/html/data/` for me

- make sure the user has write permission to the folder (`/var/www/html/data/`)
  - Note: you might want to run this as your webserver user for security

- Add a cron job to make the script run every so often - `0 0,1 * * * "cd /home/{username}/bin/ && node nomad.js > /home/{username}/bin/nomadList.log"` will run hourly

- Configure your webserver to serve the file. For nginx:

``` nginx
location = /whereami.html {
    root /var/www/html/data/;
    try_files $uri $uri/ =404;
}
```

- Add client-side code

### Client

- Add an html element `<div class="{your selector (default: location)}"></div>`
- Download client.(min | nocommment).js and add it to your code base. Make sure to update the constant values

## File Structure
- {name}.js are fully commented and intended to give you a better understanding of the code
- {name}.nocomment.js have the comments removed but are readable
- {name}.min.js are minified to a decent extent and can be used in production

## Issues + support

Feel free to create an issue if you have any questions, feature requests or found a bug. As of now, there's no specific template, but if this gets too much traction, I'll put something in place. If you want to contact me directly, feel free to [email me](mailto:me@vikaspotluri.ml), or message me on [telegram](https://t.me/vikaspotluri123) or [facebook messenger](https://m.me/vikaspotluri).

## Contributing

Feel free to create a Pull Request if you think any changes should be made. You don't have to explain yourself, but be able to if requested.