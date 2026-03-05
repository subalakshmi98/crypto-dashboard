import { getCandles } from "../../services/api";

globalThis.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([])
    })
  ) as jest.Mock;

describe("API", () => {

  test("fetch candles successfully", async () => {

    const result = await getCandles("BTC-USDT", "1m");
    expect(fetch).toHaveBeenCalled();
    expect(Array.isArray(result)).toBe(true);

  });

});