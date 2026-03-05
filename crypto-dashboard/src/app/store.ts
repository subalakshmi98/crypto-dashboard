import { create } from "zustand";
import type { Candle, OrderBook, Pair, StreamType, Timeframe } from "../types/market";

interface MarketState {
  pair: Pair;
  stream: StreamType;

  candles: Candle[];
  orderbook: OrderBook;
  midPrice: number;

  timeframe: Timeframe;

  loadingCandles: boolean;
  loadingOrderbook: boolean;

  setPair: (p: Pair) => void;
  setStream: (s: StreamType) => void;

  setCandles: (c: Candle[]) => void;
  updateCandle: (c: Candle) => void;

  setOrderbook: (o: OrderBook) => void;

  setTimeframe: (t: Timeframe) => void;

  setLoadingCandles: (v: boolean) => void;
  setLoadingOrderbook: (v: boolean) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  pair: "BTC-USDT",
  stream: "all",

  candles: [],
  orderbook: { bids: [], asks: [] },
  midPrice: 0,

  timeframe: "1m",

  loadingCandles: false,
  loadingOrderbook: false,

  setPair: (pair) =>
    set({
      pair,
      candles: [],
    }),

  setStream: (stream) => set({ stream }),

  setCandles: (candles) =>
    set({
      candles,
    }),

  updateCandle: (candle) =>
    set((state) => {
      const last = state.candles[state.candles.length - 1];

      if (last && last.time === candle.time) {
        return {
          candles: [...state.candles.slice(0, -1), candle],
        };
      }

      return {
        candles: [...state.candles.slice(-99), candle],
      };
    }),

  setOrderbook: (orderbook) =>
    set({
      orderbook,
      midPrice:
        orderbook.bids.length && orderbook.asks.length
          ? (orderbook.bids[0][0] + orderbook.asks[0][0]) / 2
          : 0,
    }),

  setTimeframe: (timeframe) =>
    set({
      timeframe,
      candles: [],
    }),

  setLoadingCandles: (loadingCandles) =>
    set({ loadingCandles }),

  setLoadingOrderbook: (loadingOrderbook) =>
    set({ loadingOrderbook }),
}));