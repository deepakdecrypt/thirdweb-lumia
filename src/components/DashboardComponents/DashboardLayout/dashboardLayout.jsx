import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/sideBar";
import "../../../App.scss";

const DashboardLayout = ({ isSideBarOpen, setSideBarOpen }) => {
  return (
    <div className="flexContainer">
      <SideBar isSideBarOpen={isSideBarOpen} setSideBarOpen={setSideBarOpen} />
      <main className="dashboardContainer text-light">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
