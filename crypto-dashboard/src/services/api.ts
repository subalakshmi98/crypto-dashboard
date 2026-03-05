import type { Pair, Candle, OrderBook, Timeframe } from "../types/market";

const BASE = "http://localhost:3001/api";

const candleCache = new Map<string, Candle[]>();
const orderCache = new Map<Pair, OrderBook>();

export async function getCandles(
  pair: Pair,
  timeframe: Timeframe
): Promise<Candle[]> {

  const key = `${pair}-${timeframe}`;

  if (candleCache.has(key)) {
    return candleCache.get(key)!;
  }

  await new Promise((r) => setTimeout(r, 800));
  const res = await fetch(`${BASE}/candles/${pair}?tf=${timeframe}`);

  if (!res.ok) {
    throw new Error("Candles fetch failed");
  }

  const data: Candle[] = await res.json();
  candleCache.set(key, data);
  return data;
}

export async function getOrderBook(pair: Pair): Promise<OrderBook> {

  if (orderCache.has(pair)) {
    return orderCache.get(pair)!;
  }

  await new Promise((r) => setTimeout(r, 800));
  const res = await fetch(`${BASE}/orderbook/${pair}`);

  if (!res.ok) {
    throw new Error("Orderbook fetch failed");
  }

  const data: OrderBook = await res.json();
  orderCache.set(pair, data);
  return data;
}