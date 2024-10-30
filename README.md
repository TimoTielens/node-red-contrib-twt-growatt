# node-red-contrib-twt-growatt
[![Release Version][release-shield]][release-link] [![Build Status][buildstatus-shield]][buildstatus-link] [![License][license-shield]](LICENSE.md)

[![BuyMeCoffee][buymecoffee-shield]][buymecoffee-link]

Node-RED module that can be used to contact the Growatt server

### Prerequisites

Have Node-RED installed and working, if you need to
install Node-RED see [here](https://nodered.org/docs/getting-started/installation).

- [Node.js](https://nodejs.org) v18.2.0+
- [Node-RED](https://nodered.org/) v4.0.0+

### Development

Always use node-red-dev validate to validate before publish https://www.npmjs.com/package/node-red-dev



### Future support
historyLastStartDate	new Date()	yesterday	The start time for retrieving the history.
historyLastEndDate	new Date()	tomorrow	The end time for retrieving the history.
historyStart	Integer	0	The server does not send all data for the time range. With the starting index you get the next rows.
faultlogdate	String	'YYYY'	It is only taken into account if faultlog is true. It must be a string with the date in 'YYYY', 'YYYY-MM', 'YYYY-MM-DD'.


[buildstatus-shield]: https://img.shields.io/github/actions/workflow/status/TimoTielens/node-red-contrib-twt-growatt/ci.yml?branch=main&style=for-the-badge
[buildstatus-link]: https://github.com/TimoTielens/node-red-contrib-twt-growatt/actions
[license-shield]: https://img.shields.io/github/license/TimoTielens/node-red-contrib-twt-growatt.svg?style=for-the-badge
[release-link]: https://github.com/TimoTielens/node-red-contrib-twt-growatt/releases
[release-shield]: https://img.shields.io/github/v/release/TimoTielens/node-red-contrib-twt-growatt?style=for-the-badge
[buymecoffee-link]: https://buymeacoffee.com/timotielens
[buymecoffee-shield]: https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png