const { CSAPI } = require('./index');

m = (async () => {

    try {
        const user = await CSAPI.fetchUser('iFraan_', 'yourApiKey')
        console.log('User:', user.info())
        console.log('Stats:', user.stats())
        console.log('Weapons:', user.weapons())
        console.log('Maps:', user.maps())
    } catch (e) {
        console.log(e)
    }

})

m()