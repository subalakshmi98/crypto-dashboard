import { useMarketStore } from "../app/store";

let ws: WebSocket;
let currentPair: string | null = null;
let isConnected = false;

export function connectSocket() {
  if (ws) return;
  console.log("Connecting WebSocket...");
  ws = new WebSocket("ws://localhost:3001");

  ws.onopen = () => {
    isConnected = true;
    console.log("WebSocket Connected");

    // Default subscription
    subscribe("BTC-USDT");
  };

  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    const store = useMarketStore.getState();

    if (msg.type === "candle_update") {
      store.updateCandle(msg.data);
    }

    if (msg.type === "orderbook_update") {
      store.setOrderbook(msg.data);
    }
  };

  ws.onclose = () => {
    console.log("WebSocket Disconnected");
    isConnected = false;
    currentPair = null;
  };
}

export function subscribe(pair: string) {
  if (!isConnected) {
    console.log("WS not ready yet...");
    return;
  }

  if (pair === currentPair) {
    console.log("Already subscribed to", pair);
    return;
  }

  // Unsubscribe old
  if (currentPair) {
    console.log("Unsubscribing from", currentPair);

    ws.send(JSON.stringify({
      type: "unsubscribe",
      pair: currentPair
    }));
  }

  // Subscribe new
  console.log("Subscribing to", pair);

  ws.send(JSON.stringify({
    type: "subscribe",
    pair,
    stream: "all"
  }));

  currentPair = pair;
}