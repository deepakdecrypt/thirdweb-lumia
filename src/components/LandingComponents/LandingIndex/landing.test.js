import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LandingPage from "./landing";

describe("LandingPage", () => {
  test("renders LandingPage component", () => {
    render(<LandingPage />);
    // Check if the Text is rendered
    expect(screen.getByText("LUMIA HUB")).toBeInTheDocument();
    expect(screen.getByText("Reinventing")).toBeInTheDocument();
    expect(screen.getByText("DeFi for RWAs")).toBeInTheDocument();
    // Check if the "Try it out" button is rendered on landing page
    // const landingPageBtn = screen.getByTestId("landingPageBtn");
    // expect(landingPageBtn).toBeInTheDocument();
  });
});
