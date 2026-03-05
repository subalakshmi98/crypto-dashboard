import { useMarketStore } from "../app/store";

export default function OrderBook() {
  const { orderbook, midPrice } = useMarketStore();

  const calculateTotals = (orders: [number, number][]) => {
    let running = 0;
    return orders.map(([price, amount]) => {
      running += amount;
      return {
        price,
        amount,
        total: running,
      };
    });
  };

  const asks = calculateTotals(orderbook.asks || []);
  const bids = calculateTotals(orderbook.bids || []);

  return (
    <div className="w-full border rounded p-3">

      <div className="grid grid-cols-2 text-center font-semibold mb-2">
        <div className="text-red-500">Asks</div>
        <div className="text-green-500">Bids</div>
      </div>

      <div className="grid grid-cols-2 text-xs mb-1">
        <div className="grid grid-cols-3 text-red-400">
          <span>Price</span>
          <span>Amount</span>
          <span>Total</span>
        </div>

        <div className="grid grid-cols-3 text-green-400">
          <span>Price</span>
          <span>Amount</span>
          <span>Total</span>
        </div>
      </div>

      <div className="grid grid-cols-2 text-sm">

        <div className="flex flex-col text-red-500">
          {asks.map((o, i) => (
            <div key={i} className="grid grid-cols-3">
              <span>{o.price.toFixed(2)}</span>
              <span>{o.amount.toFixed(4)}</span>
              <span>{o.total.toFixed(4)}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col text-green-500">
          {bids.map((o, i) => (
            <div key={i} className="grid grid-cols-3">
              <span>{o.price.toFixed(2)}</span>
              <span>{o.amount.toFixed(4)}</span>
              <span>{o.total.toFixed(4)}</span>
            </div>
          ))}
        </div>

      </div>

      <div className="text-center text-xl font-bold text-yellow-400 mt-4">
        {midPrice.toFixed(2)}
      </div>

    </div>
  );
}