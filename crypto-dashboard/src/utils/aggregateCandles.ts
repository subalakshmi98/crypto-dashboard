import type { Candle, Timeframe } from "../types/market";

export function aggregateCandles(
  candles: Candle[],
  timeframe: Timeframe
): Candle[] {

  if (timeframe === "1m") return candles;
  const interval = timeframe === "5m" ? 5 : 15;
  const result: Candle[] = [];

  for (let i = 0; i < candles.length; i += interval) {

    const chunk = candles.slice(i, i + interval);
    if (!chunk.length) continue;

    result.push({
      time: chunk[0].time,
      open: chunk[0].open,
      high: Math.max(...chunk.map(c => c.high)),
      low: Math.min(...chunk.map(c => c.low)),
      close: chunk[chunk.length - 1].close,
      volume: chunk.reduce((sum, c) => sum + c.volume, 0)
    });

  }

  return result;
}