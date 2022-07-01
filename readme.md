<div align="center">
	<h1>m4a1.js</h1>
   <a href="https://www.npmjs.com/package/m4a1.js"><img src="https://badgen.net/npm/v/m4a1.js?color=red" alt="NPM-Version"/></a>
   <a href="https://www.npmjs.com/package/m4a1.js"><img src="https://badgen.net/npm/dt/m4a1.js?color=red" alt="NPM-Downloads"/></a>
   <a href="https://github.com/iFraan/m4a1.js"><img src="https://badgen.net/github/stars/iFraan/m4a1.js?color=green" alt="Github Stars"/></a>
   <a href="https://github.com/iFraan/m4a1.js/issues"><img src="https://badgen.net/github/issues/iFraan/m4a1.js?color=green" alt="Issues"/></a>
   <h2>This a wrapper of the TRNetwork Public API for <b>CSGO</b> stats.</h2>
</div>

## Instalattion
You gotta request a Free API key on [Tracker.gg](https://tracker.gg/developers)
### Dependencies
``
axios
``

To install use:
```shell
npm i m4a1.js
```


You must call **CSAPI.fetchUser** before using any other method.
| Methods | Description |
| - | - |
| info | user info |
| stats | lifeline stats |
| weapons | weapons stats |
| maps | maps stats |

There are constants to format the string of maps and weapons _(feel free to pr if something is missing)_
```js
const { MAPS, WEAPONS } = require('m4a1.js')
/* Maps */
MAPS['de_cbble']			// Cobblestone
MAPS['de_train']			// Train
MAPS['de_shorttrain']		// Train (wingman)
/* Weapons */
WEAPONS['ak47']				// AK-47
WEAPONS['deagle']			// Desert Eagle
WEAPONS['hkp2000']			// P2000
```

This supports either
* SteamID
* Vanity URL

You can see the diference between them in [this](https://steamid.pro/steam-id-lookup) page


Example code: _(Feel free to use my steamid for testing)_
```js
const { CSAPI } = require('m4a1.js')

try {

	const user = await CSAPI.fetchUser('iFraan_', 'YourApiKey')
	
	console.log('User:', user.info())
	/*
	User: {
		platform: 'steam' ,
		steamid: '76561198137433783' ,
		name: 'fran' ,
		avatar: 'https://avatars.akamai.steamstatic.com/b5ac48b867b9ac1935fc564eaf1b43e8ac326e24_full.jpg'
	}
	*/

	console.log('Stats:', user.stats())
	/*
	Stats: {
		timePlayedDisplay: '1,311h',
		timePlayed: 4722655,
		score: 248751,
		kills: 100376,
		deaths: 64971,
		kd: 1.5449354327315263,
		damage: 11336712,
		headshots: 42423,
		dominations: 649,
		shotsFired: 1308051,
		shotsHit: 299525,
		shotsAccuracy: 22.89857199757502,
		snipersKilled: 4619,
		dominationOverkills: 666,
		dominationRevenges: 177,
		bombsPlanted: 4962,
		bombsDefused: 989,
		moneyEarned: 191909700,
		hostagesRescued: 0,
		mvp: 11693,
		wins: 1466,
		ties: 0,
		matchesPlayed: 3877,
		losses: 2411,
		roundsPlayed: 68576,
		roundsWon: 1466,
		wlPercentage: 37.8,
		headshotPct: 42.3
	}
	*/

	console.log('Weapons:', user.weapons())
	/*
	Weapons: {
		ak47: {
		  kills: 24626,
		  shotsFired: 465473,
		  shotsHit: 107951,
		  shotsAccuracy: 23.191678142448648
		},
		aug: {
		  kills: 1253,
		  shotsFired: 25473,
		  shotsHit: 4664,
		  shotsAccuracy: 18.309582695402977
		},
		awp: {
		  kills: 8690,
		  shotsFired: 32426,
		  shotsHit: 9679,
		  shotsAccuracy: 29.84950348485783
		},
		...
	}
	*/
	console.log('Maps:', user.maps())
	/* 
	Maps: {
		de_cbble: { 
			rounds: 1595, 
			wins: 770, 
			wr: 0.4827586206896552 
		},
		de_inferno: { 
			rounds: 14407, 
			wins: 7198, 
			wr: 0.4996182411327827 
		},
		de_nuke: { 
			rounds: 687, 
			wins: 358, 
			wr: 0.5211062590975255 
		},
		...
	}
	*/

} catch (e) {
	console.log(e)
	/* Error: We could not find the player [player]. */
}
```


## Disclaimer
This project is fully for educational purposes.