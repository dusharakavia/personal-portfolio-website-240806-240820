import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders portfolio navigation", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /about/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /skills/i })).toBeInTheDocument();
});
