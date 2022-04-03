const log = (msg, ...params) => {
    console.log(`${new Date().toLocaleTimeString()} - ${msg}`);
    params.forEach(p => console.log(" --> ", p));
}

module.exports = { log };
