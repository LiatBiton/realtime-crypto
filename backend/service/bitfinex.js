const axios = require('axios')

const baseUrl = 'https://api-pub.bitfinex.com/v2/tickers?symbols';

function getAllSymbols() {
    return axios.get(`${baseUrl}=ALL`)
        .then(({ data }) => data.map(d=>d[0]))
}

function getSymbolsData(symbols = []) {
    const symbolsStr = symbols.join(',')
    return axios.get(`${baseUrl}=${symbolsStr}`)
        .then(({ data }) => data)
}

module.exports = {
    getAllSymbols,
    getSymbolsData
};
