import { useMarketStore } from "../app/store";
import type { Timeframe } from "../types/market";

const frames: Timeframe[] = ["1m", "5m", "15m"];

export default function TimeframeSelector() {
  const { timeframe, setTimeframe } = useMarketStore();

  return (
    <div className="flex gap-2">
      {frames.map((tf) => (
        <button
          key={tf}
          onClick={() => setTimeframe(tf)}
          className={`px-3 py-1 rounded border ${
            timeframe === tf
              ? "bg-blue-500 text-white"
              : "bg-white"
          }`}
        >
          {tf}
        </button>
      ))}
    </div>
  );
}