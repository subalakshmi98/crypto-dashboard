import { aggregateCandles } from "../../utils/aggregateCandles";

describe("aggregateCandles", () => {

  const candles = [
    { time: 1, open: 1, high: 2, low: 1, close: 2, volume: 10 },
    { time: 2, open: 2, high: 3, low: 2, close: 3, volume: 5 },
    { time: 3, open: 3, high: 4, low: 3, close: 4, volume: 8 },
    { time: 4, open: 4, high: 5, low: 4, close: 5, volume: 6 },
    { time: 5, open: 5, high: 6, low: 5, close: 6, volume: 9 }
  ];

  test("aggregates 5m candles correctly", () => {

    const result = aggregateCandles(candles, "5m");

    expect(result.length).toBe(1);
    expect(result[0].open).toBe(1);
    expect(result[0].close).toBe(6);

  });

});