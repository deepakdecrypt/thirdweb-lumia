import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import App from "./App";

// Mock the necessary components to avoid rendering the actual components
jest.mock("./components/LandingComponents/LandingIndex/landing", () => () => (
  <div data-testid="landing-page">Landing Page</div>
));
jest.mock("./components/LandingComponents/Header/headerNav", () => () => (
  <div data-testid="header-nav">Header Navigation</div>
));
jest.mock(
  "./components/LandingComponents/ComingSoon/comingSoon",
  () =>
    ({ pageHeading }) => (
      <div data-testid="coming-soon">{pageHeading} Page Coming Soon</div>
    ),
);

// Custom test wrapper component
// need BrowserRouter to be moved out of app.js to work
// can not wrap router inside a router
const AppTestWrapper = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
);

describe("App Component", () => {
  test("renders the App component and header navigation", async () => {
    render(<AppTestWrapper />);

    // Check if the header navigation is rendered
    expect(await screen.findByTestId("header-nav")).toBeInTheDocument();
  });

  test("renders the landing page component on the root route", async () => {
    render(<AppTestWrapper />);

    // Check if the landing page is rendered
    expect(await screen.findByTestId("landing-page")).toBeInTheDocument();
  });

  test("renders the About page on /about route", async () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <App />
      </MemoryRouter>,
    );

    // Check if the About page is rendered
    expect(
      await screen.findByText("About Page Coming Soon"),
    ).toBeInTheDocument();
  });

  test("renders the Features page on /features route", async () => {
    render(
      <MemoryRouter initialEntries={["/features"]}>
        <App />
      </MemoryRouter>,
    );

    // Check if the Features page is rendered
    expect(
      await screen.findByText("Features Page Coming Soon"),
    ).toBeInTheDocument();
  });

  test("redirects to the root page on an invalid route", async () => {
    render(
      <MemoryRouter initialEntries={["/invalid-route"]}>
        <App />
      </MemoryRouter>,
    );

    // Check if the landing page is rendered due to redirection
    expect(await screen.findByTestId("landing-page")).toBeInTheDocument();
  });
});
