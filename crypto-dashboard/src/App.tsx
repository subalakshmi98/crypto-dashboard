import { useEffect } from "react";
import { useMarketStore } from "./app/store";

import { getCandles, getOrderBook } from "./services/api";
import { connectSocket, subscribe } from "./services/socket";

import PairSelector from "./components/PairSelector";
import StreamSelector from "./components/StreamSelector";
import TimeframeSelector from "./components/TimeframeSelector";
import CandleChart from "./components/CandleChart";
import OrderBook from "./components/OrderBook";
import Loader from "./components/Loader";
import { aggregateCandles } from "./utils/aggregateCandles";

export default function App() {
  const {
    pair,
    stream,
    timeframe,

    setCandles,
    setOrderbook,

    setLoadingCandles,
    setLoadingOrderbook,

    loadingCandles,
    loadingOrderbook,
  } = useMarketStore();

  useEffect(() => {
    connectSocket();
  }, []);

  useEffect(() => {
    async function load() {
      try {
        setLoadingCandles(true);
        setLoadingOrderbook(true);
  
        const rawCandles = await getCandles(pair, "1m");
  
        const candles = aggregateCandles(rawCandles, timeframe);
  
        const order = await getOrderBook(pair);
  
        setCandles(candles);
        setOrderbook(order);
  
        subscribe(pair);
  
      } finally {
        setLoadingCandles(false);
        setLoadingOrderbook(false);
      }
    }
  
    load();
  }, [pair, timeframe]);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-6xl p-4 flex flex-col gap-6">

        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          <PairSelector />
          <StreamSelector />
          <TimeframeSelector />
        </div>

        {/* Candle Chart */}
        {(stream === "all" || stream === "candles") && (
          <div className="bg-white rounded-lg shadow p-2 w-full">
            {loadingCandles ? (
              <Loader />
            ) : (
              <CandleChart />
            )}
          </div>
        )}

        {/* Order Book */}
        {(stream === "all" || stream === "orderbook") && (
          <div className="bg-white rounded-lg shadow p-3 max-h-[350px] overflow-y-auto">
            {loadingOrderbook ? (
              <Loader />
            ) : (
              <OrderBook />
            )}
          </div>
        )}
      </div>
    </div>
  );
}