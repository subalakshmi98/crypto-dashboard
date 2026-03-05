import { useMarketStore } from "../app/store";

export default function PairSelector() {
  const { pair, setPair } = useMarketStore();

  return (
    <select value={pair} onChange={e => setPair(e.target.value as any)}>
      <option>BTC-USDT</option>
      <option>ETH-USDT</option>
      <option>XRP-USDT</option>
    </select>
  );
}