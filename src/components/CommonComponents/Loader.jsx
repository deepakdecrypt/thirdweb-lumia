import React, { useEffect, useState } from "react";
import "./Loader.css";
import LoaderImage from "../../assets/LumiaLoader.gif";

const Loader = ({ dashboardLoader }) => {
  const [isDashboardLoader, setDashboardLoader] = useState(false);
  useEffect(() => {
    if (dashboardLoader) {
      setDashboardLoader(true);
    }
  }, [dashboardLoader]);
  return (
    <>
      <div
        className={`${isDashboardLoader ? "dashboard-loader-overlay" : "loader-overlay"}`}
      >
        <div className="loader-container">
          <img src={LoaderImage} alt="Lumia Loader" className="LoaderImage" />
        </div>
      </div>
    </>
  );
};

export default Loader;
