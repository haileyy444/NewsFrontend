import { render, fireEvent } from "@testing-library/react";
import Popup from "../components/Article";

it("renders without crashing - smoke test", function() {
  render (<Popup />);
});
it("Matches snapshot - snapshot test", function() {
  const {asFragment} = render(<Popup />);
  expect(asFragment()).toMatchSnapshot();
});

