const express = require("express");
const axios = require('axios')
const { getAllSymbols, getSymbolsData } = require('../../service/bitfinex');

const rest = express();

rest.use(express.json());

rest.get('/api/symbols', async(req, res) => {
    return getAllSymbols().then(data => res.json(data));
});

rest.post('/api/get_full_data', async(req, res) => {
    const symbolsArr = req.body.symbols;
    if (symbolsArr) {
        getSymbolsData(symbolsArr).then((data) => res.json(data));
    } else {
        return res.status(500);
    }
});

module.exports = rest
