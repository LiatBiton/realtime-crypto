const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path")
const restRouter = require('./api/rest');
const { initBitFinexSockets, handleConnection } = require('./api/sockets');
const { getAllSymbols, getSymbolsData } = require('./service/bitfinex');

const PORT = process.env.PORT || 3000;
const app = express();
const httpServer = createServer(app);

app.use(restRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

httpServer.listen(PORT);

io.on("connection", handleConnection);

initBitFinexSockets();
