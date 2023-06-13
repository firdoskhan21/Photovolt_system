const constants = require('../config')
const https = require('https')
const axios = require('axios')
do_call = async (file_hash) => {
    try {
        return await axios.get(`https://www.tu-chemnitz.de/informatik/DVS/blocklist/${file_hash}`, {
            headers: {
                "Content-Type": "application/json",
                'Cookie': constants.WTC_creds.username + " ;" + constants.WTC_creds.sessionId
            }
        })
    } catch (error) {
        console.error(error)
    }

    // var options = {
    //     hostname: 'www.tu-chemnitz.de',
    //     path: '/informatik/DVS/blocklist/' + file_hash,
    //     method: 'GET',
    //     headers: { 'Cookie': constants.WTC_creds.username + " ;" + constants.WTC_creds.sessionId }
    // };
    // var results = '';
    // var req = https.request(options, function (res) {
    //     console.log(res)
    //     res.on('data', function (chunk) {
    //         results = results + chunk;
    //         console.log(results)
    //         //TODO
    //     });
    //     res.on('end', function () {
    //         console.log(res)
    //     });
    // });

    // req.on('error', function (e) {
    //     //TODO
    // });

    // req.end();

}


exports.check_file = async () => {
    const breeds = await do_call('sometext')
    console.log(breeds)
    breeds.then(res => {
        console.log(res)
    })
        .catch(err => {
            console.log(err)
        });

}

// module.exports = check_file