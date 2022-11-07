const axios = require('axios');
const errorConstants = require('../errorConstants');

exports.getSymbolQuote = async (req, res) => { 
    let config = {
    method: 'get',
    url: 'pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=' + req.symbol,
    headers: { 
        'X-CMC_PRO_API_KEY': '901b6b0e-ad9d-46a0-8669-65efe6013b3e', 
        'Accept': '*/*'
    }
    };

    axios(config)
        .then(function (response) {
        res.status = 200;  
        res.data = JSON.stringify(response.data);
    })
        .catch(function (error) {
        res.status = 500;
        res.error;
    });
}