import { render, screen } from "@testing-library/react";
import OrderBook from "../../components/OrderBook";
import { useMarketStore } from "../../app/store";

describe("OrderBook", () => {

  beforeEach(() => {

    useMarketStore.setState({
      orderbook: {
        bids: [[100, 1]],
        asks: [[101, 2]]
      },
      midPrice: 100.5
    });

  });

  test("renders orderbook headers", () => {

    render(<OrderBook />);
    expect(screen.getByText("Asks")).toBeInTheDocument();
    expect(screen.getByText("Bids")).toBeInTheDocument();

  });

});