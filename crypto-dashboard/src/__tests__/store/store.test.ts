import { useMarketStore } from "../../app/store";

describe("Market Store", () => {

  test("updates pair correctly", () => {

    useMarketStore.getState().setPair("ETH-USDT");
    expect(useMarketStore.getState().pair).toBe("ETH-USDT");

  });

  test("sets candles correctly", () => {

    const candles = [
      { time: 1, open: 1, high: 2, low: 1, close: 2, volume: 10 }
    ];

    useMarketStore.getState().setCandles(candles);
    expect(useMarketStore.getState().candles.length).toBe(1);

  });

});