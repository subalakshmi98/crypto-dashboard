const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = 3001;
const PAIRS = ["BTC-USDT", "ETH-USDT", "XRP-USDT"];

let marketState = {};
let subscriptions = new Map();

function random(min, max) {
  return Math.random() * (max - min) + min;
}

// ============================
// INITIAL MARKET GENERATION
// ============================

function generateInitialState() {
  PAIRS.forEach(pair => {
    let price = getBasePrice(pair);

    marketState[pair] = {
      price,
      candles: generateCandles(price),
      orderbook: generateOrderBook(price)
    };
  });
}

function getBasePrice(pair) {
  switch(pair) {
    case "BTC-USDT": return 30000;
    case "ETH-USDT": return 2000;
    case "XRP-USDT": return 0.5;
    default: return 100;
  }
}

function generateCandles(basePrice) {
  let candles = [];
  let time = Date.now() - 100 * 60000;

  for (let i = 0; i < 100; i++) {
    let open = basePrice + random(-50, 50);
    let close = open + random(-20, 20);
    let high = Math.max(open, close) + random(0, 15);
    let low = Math.min(open, close) - random(0, 15);

    candles.push({
      time: time + i * 60000,
      open,
      high,
      low,
      close,
      volume: random(0.1, 10)
    });
  }
  return candles;
}

function generateOrderBook(price) {
  let bids = [];
  let asks = [];

  for (let i = 1; i <= 10; i++) {
    bids.push([
      +(price - i * random(1, 10)).toFixed(2),
      +random(0.1, 2).toFixed(3)
    ]);

    asks.push([
      +(price + i * random(1, 10)).toFixed(2),
      +random(0.1, 2).toFixed(3)
    ]);
  }

  return { bids, asks };
}

generateInitialState();

// ============================
// REST API
// ============================

app.get("/api/candles/:pair", (req, res) => {
  const { pair } = req.params;
  res.json(marketState[pair]?.candles || []);
});

app.get("/api/orderbook/:pair", (req, res) => {
  const { pair } = req.params;
  res.json(marketState[pair]?.orderbook || {});
});

// ============================
// WEBSOCKET
// ============================

wss.on("connection", ws => {
  console.log("Client connected");

  ws.on("message", message => {
    try {
      const data = JSON.parse(message);

      if (data.type === "subscribe") {
        subscriptions.set(ws, data);

        const state = marketState[data.pair];

        if (!state) return;

        ws.send(JSON.stringify({
          type: "initial_candles",
          pair: data.pair,
          data: state.candles
        }));

        ws.send(JSON.stringify({
          type: "initial_orderbook",
          pair: data.pair,
          data: state.orderbook
        }));
      }

    } catch(err) {
      console.error("Invalid message", err);
    }
  });

  ws.on("close", () => {
    subscriptions.delete(ws);
    console.log("Client disconnected");
  });
});

// ============================
// MARKET SIMULATION
// ============================

function simulateMarket() {
  PAIRS.forEach(pair => {
    let state = marketState[pair];

    let move = random(-1, 1);
    state.price += move;

    // New Candle
    let candle = {
      time: Date.now(),
      open: +(state.price).toFixed(2),
      high: +(state.price + random(0, 5)).toFixed(2),
      low: +(state.price - random(0, 5)).toFixed(2),
      close: +(state.price + random(-2, 2)).toFixed(2),
      volume: +random(0.1, 5).toFixed(2)
    };

    state.candles.push(candle);
    if (state.candles.length > 100) state.candles.shift();

    // Update orderbook
    state.orderbook = generateOrderBook(state.price);

    broadcast(pair, candle, state.orderbook);
  });
}

function broadcast(pair, candle, orderbook) {
  subscriptions.forEach((sub, ws) => {

    if (sub.pair !== pair) return;

    if (sub.stream === "all" || sub.stream === "candles") {
      ws.send(JSON.stringify({
        type: "candle_update",
        pair,
        data: candle
      }));
    }

    if (sub.stream === "all" || sub.stream === "orderbook") {
      ws.send(JSON.stringify({
        type: "orderbook_update",
        pair,
        data: orderbook
      }));
    }

  });
}

setInterval(simulateMarket, 2000);

// ============================
// START SERVER
// ============================

server.listen(PORT, () => {
  console.log(`Mock Crypto Server running on http://localhost:${PORT}`);
});