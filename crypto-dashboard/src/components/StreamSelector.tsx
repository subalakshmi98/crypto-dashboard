import { useMarketStore } from "../app/store";

export default function StreamSelector() {
  const { stream, setStream } = useMarketStore();

  return (
    <select value={stream} onChange={e => setStream(e.target.value as any)}>
      <option value="all">All</option>
      <option value="candles">Candles Only</option>
      <option value="orderbook">Orderbook Only</option>
    </select>
  );
}