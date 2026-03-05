export type Pair = "BTC-USDT" | "ETH-USDT" | "XRP-USDT";
export type Timeframe = "1m" | "5m" | "15m";

export type StreamType = "all" | "candles" | "orderbook";

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface OrderBook {
  bids: [number, number][];
  asks: [number, number][];
}