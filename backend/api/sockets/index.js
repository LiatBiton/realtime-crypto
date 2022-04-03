const ws = require('ws')
const _ = require('lodash')
const { getAllSymbols } = require('../../service/bitfinex');
const { log } = require('../../logger');

const chanIdToSymbols = {}

let socketMembers = []

const handleConnection = (socket) => {
    console.log("Got a connection to the socket !!!! ", socket.id);
    
    socket.on("getLiveData", (symbols) => {
        console.log("Got new getLiveData : ", symbols)
    })
    socketMembers.push(socket)
}

async function initBitFinexSockets(){
    const allSymbols = await getAllSymbols()
    const w = new ws('wss://api-pub.bitfinex.com/ws/2')

    w.on('message', (msg) => {
        const parsedMsg = JSON.parse(msg);
        if(parsedMsg.event === 'subscribed') {
            chanIdToSymbols[parsedMsg.chanId] = parsedMsg.symbol;
            log(`Got new subscription message for : ${parsedMsg.symbol}`)
        } else if(
            _.isArray(parsedMsg) &&
            _.isArray(parsedMsg[1]) &&
            parsedMsg[1].length === 10 &&
            Object.keys(chanIdToSymbols).includes(parsedMsg[0].toString())) {
                const chanId = parsedMsg[0]
                parsedMsg[1].unshift(chanIdToSymbols[chanId]);

                // Send the new rates to all users
                socketMembers.forEach(socket=> {
                    socket.emit("live data", parsedMsg[1])
                })
        }
    })

    const symbolsToSend = allSymbols.map(symbol =>
        JSON.stringify({ 
            event: 'subscribe', 
            channel: 'ticker', 
            symbol 
        })
    )

    w.on('open', () => {
        const batches = _.chunk(symbolsToSend,30);
        log(`Subscribing to ${symbolsToSend.length} symbols in ${batches.length} chunks`)
        batches.forEach((chunk, idx) => {
            setTimeout(() => {
                log(`Asking for batch ${idx + 1}/${batches.length}`)
                chunk.forEach(symbol=> w.send(symbol))
            }, 60000 * idx);
        });
    })
}

module.exports = { 
    initBitFinexSockets,
    handleConnection
};
