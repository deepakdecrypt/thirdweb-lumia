import React, { useState, useEffect, Suspense, lazy } from "react";
import "./App.scss";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import eventEmitter from "./components/CommonComponents/eventEmitter";
import { checkIfUserLoggedIn } from "./services/authServices";

// Using lazy loading to render components and optimize performance
const LandingPage = lazy(
  () => import("./components/LandingComponents/LandingIndex/landing"),
);
const HeaderNav = lazy(
  () => import("./components/LandingComponents/Header/headerNav"),
);
const Footer = lazy(
  () => import("./components/LandingComponents/Footer/footer"),
);
const ComingSoon = lazy(
  () => import("./components/LandingComponents/ComingSoon/comingSoon"),
);
const DashboardLayout = lazy(
  () =>
    import("./components/DashboardComponents/DashboardLayout/dashboardLayout"),
);
const DashboardLandingPage = lazy(
  () => import("./components/DashboardComponents/Dashboard/dashboard"),
);
/**
 * ProtectedRoute Component
 *
 * This component ensures that only logged-in users can access certain routes.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isLoggedIn - Indicates if the user is logged in.
 * @param {React.ReactNode} props.children - The child components to render if the user is logged in.
 * @returns {React.ReactNode} The children if logged in, otherwise a Navigate component to redirect.
 */
function ProtectedRoute({ children, isLoggedIn }) {
  return isLoggedIn ? children : <Navigate to="/" />;
}

/**
 * App Component
 *
 * This is the main component of the application.
 * It handles the routing and layout based on the user's authentication status.
 *
 * @returns {JSX.Element} The rendered application component.
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkUserLogIn = async () => {
      const { statusCode } = await checkIfUserLoggedIn();
      if (statusCode === 200) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsAuthChecked(true);
    };
    checkUserLogIn();
  }, []);

  /**
   * useEffect to check user authentication status on component mount.
   * It updates the login state based on the presence of a wallet address in local storage.
   * It also sets up event listeners for user connection and disconnection events.
   */
  useEffect(() => {
    const handleUserDisconnected = () => {
      console.log("handleUserDisconnected Called");
      setIsLoggedIn(false);
    };

    const handleUserConnected = () => {
      console.log("handleUserConnected Called");
      setIsLoggedIn(true);
    };

    eventEmitter.on("userDisconnected", handleUserDisconnected);
    eventEmitter.on("userConnected", handleUserConnected);

    return () => {
      eventEmitter.off("userDisconnected", handleUserDisconnected);
      eventEmitter.off("userConnected", handleUserConnected);
    };
  }, []);

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`App ${!isLoggedIn && location.pathname.startsWith("/") && "landingBg"}`}
    >
      <div className="outerContainer customContainer">
        <Suspense fallback={<div>Loading Header...</div>}>
          <HeaderNav
            isSideBarOpen={isSideBarOpen}
            setSideBarOpen={setSideBarOpen}
          />
        </Suspense>

        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LandingPage />
              </Suspense>
            }
          />

          <Route
            path="/dashboard"
            element={
              <DashboardLayout
                isSideBarOpen={isSideBarOpen}
                setSideBarOpen={setSideBarOpen}
              />
            }
          >
            <Route
              index
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Suspense fallback={<div>Loading Dashboard...</div>}>
                    <DashboardLandingPage />
                  </Suspense>
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} />}
          />
        </Routes>

        <Suspense fallback={<div>Loading Footer...</div>}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
