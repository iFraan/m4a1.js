const TRHeader = {
    'TRN-Api-Key': '',
    'Accept': 'application/json'
}
const axios = require('axios')
const V1Url = `https://public-api.tracker.gg/v1/csgo/standard/profile/steam/{PLAYER}`
const V2Url = `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/{PLAYER}`

const key = (arr, name) => arr[arr.indexOf(arr.find(x => x.metadata.key == name))].value; 

const fetch = (url) => new Promise((resolve, reject) => {

    axios.get(url, { headers: TRHeader }).then(res => {
        resolve(res.data)
    })
    .catch(err => {
        reject(err.response.data)
    })

})


class CSAPI {

    /**
     * Use CSAPI.fetchUser instead.
     * @param {string} username 
     * @param {string} apiKey 
     * @private // idk if it does something outside of typescript, but there it is
     */
    constructor (username, apiKey){
        this.username = username;
        TRHeader['TRN-Api-Key'] = apiKey;
        this._raw = {}
    }


    /**
     * Initialize the wrapper
     * @param {string} apiKey 
     * @param {string} username 
     * @returns CSAPI instance
     */
    static async fetchUser(username, apiKey){
        const API = new CSAPI(username, apiKey);
        if (typeof username == 'undefined') throw new Error('You gotta provide an username.');
        if (typeof apiKey == 'undefined') throw new Error('You gotta provide an API key.');
        try {
            API._raw.v2 = await fetch(V2Url.replace('{PLAYER}', username))
            API._raw.v1 = await fetch(V1Url.replace('{PLAYER}', username))
            if (API._raw.v2.errors) throw new Error(API._raw.v2.errors[0])
            if (API._raw.v1.errors) throw new Error(API._raw.v1.errors[0])
        } catch (e) {
            if (e?.message == 'Invalid authentication credentials') throw new Error('Invalid API Key provided. Please go to https://tracker.gg/developers and request one.');
            if (e?.errors[0].message.includes('NotFound')) throw new Error('User not found.');
            console.log(e)
        }
        return API;
    }

    /**
     * Lifetime Stats
     * @returns Lifetime stats of the player
     */
    stats(){
        const result = {}
        const data  = this._raw.v2.data.segments[0];
        const keys = Object.keys(data.stats)
        result['timePlayedDisplay'] = data.stats['timePlayed'].displayValue
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            result[key] = data.stats[key].value;
        }

        return result;
    }


    /**
     * Get stats for maps
     * @returns Formated json of all available maps stats
     */
    maps() { 
        const result = {};
        const w = this._raw.v1.data.children.filter(x => x.id.startsWith('map.'));
        for (let i = 0 ; i < w.length ; i++) {
            const p = w[i]
            if (p) {
                result[p.metadata.name] = {}
                for (let i = 0; i < p.stats.length; i++) {
                    const key = p.stats[i];
                    result[p.metadata.name][key.metadata.key] = key.value;
                }
                result[p.metadata.name]['wr'] = (key(p.stats, 'wins')/key(p.stats, 'rounds'));
            }
        }
        return result;

    }

    /**
     * Get stats for weapons
     * @returns Formated json of all available weapons stats
     */
    weapons() { 
        const result = {};
        const w = this._raw.v1.data.children.filter(x => x.id.startsWith('weapon.'));
        for (let i = 0 ; i < w.length ; i++) {
            const p = w[i]
            if (p) {
                result[p.metadata.name] = {}
                for (let i = 0; i < p.stats.length; i++) {
                    const key = p.stats[i];
                    result[p.metadata.name][key.metadata.key] = key.value;
                }
            }
        }

        return result;

    }


    /**
     * Get userinfo from the platform
     * @returns userinfo
     */
    info() { 
        const result = {};
        const platform = this._raw.v2.data.platformInfo;

        result[ 'platform' ] = platform.platformSlug;
        result[ 'steamid' ]  = platform.platformUserId;
        result[ 'name' ]     = platform.platformUserHandle;
        result[ 'avatar' ]   = platform.avatarUrl;

        return result;
    }

    get raw() { return this._raw; }
}

module.exports = {
    CSAPI
}