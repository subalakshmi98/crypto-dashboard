import { render, screen } from "@testing-library/react";
import PairSelector from "../../components/PairSelector";

test("renders pair selector dropdown", () => {

  render(<PairSelector />);
  expect(screen.getByRole("combobox")).toBeInTheDocument();

});