import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import HeaderNav from "./headerNav";
import { LumiaLogo } from "../../../assets/svg";

// Mock the LumiaLogo component to avoid rendering the SVG
jest.mock("../../../assets/svg", () => ({
  LumiaLogo: () => <div data-testid="lumia-logo" />,
}));

describe("HeaderNav", () => {
  test("renders HeaderNav component", () => {
    render(
      <BrowserRouter>
        <HeaderNav />
      </BrowserRouter>,
    );
    // Check if the logo is rendered
    expect(screen.getByTestId("lumia-logo")).toBeInTheDocument();
    // Check if navigation links are rendered
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Roadmap")).toBeInTheDocument();
    expect(screen.getByText("Partners")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    // Check if the "Try it out" button is rendered
    // expect(screen.getByText("Try it out")).toBeInTheDocument();
  });
});
