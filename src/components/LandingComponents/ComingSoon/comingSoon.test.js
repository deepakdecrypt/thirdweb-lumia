import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ComingSoon from "./comingSoon";

describe("ComingSoon", () => {
  test("renders ComingSoon component", () => {
    render(<ComingSoon />);
    // Check if the Text is rendered
    expect(screen.getByText("Coming Soon")).toBeInTheDocument();
    // Check if the Page Name Heading is rendered on Coming Soon page
    const pageHeading = screen.getByTestId("pageHeading");
    expect(pageHeading).toBeInTheDocument();
  });
});
