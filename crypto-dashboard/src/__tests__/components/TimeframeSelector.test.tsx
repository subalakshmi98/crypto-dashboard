import { render, screen } from "@testing-library/react";
import TimeframeSelector from "../../components/TimeframeSelector";

test("renders timeframe buttons", () => {

  render(<TimeframeSelector />);

  expect(screen.getByText("1m")).toBeInTheDocument();
  expect(screen.getByText("5m")).toBeInTheDocument();
  expect(screen.getByText("15m")).toBeInTheDocument();

});