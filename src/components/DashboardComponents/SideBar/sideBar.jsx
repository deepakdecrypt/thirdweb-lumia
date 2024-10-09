import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  SettingsLogo,
  SideBarAILogo,
  SideBarBridgeLogo,
  SideBarKYCLogo,
  SideBarNewsLogo,
  SideBarRampLogo,
  SideBarUserLogo,
  SideBarWalletLogo,
} from "../../../assets/svg";
import { Link, useLocation } from "react-router-dom/dist";
import { dummyProfile } from "../../../config/constant";
import { isEmptyCheck } from "../../../utils/validation";

/**
 * SideBar Component
 *
 * This component renders the sidebar navigation for the application.
 * It includes the logo, user profile section, navigation links, and wallet management.
 *
 * @returns {JSX.Element} The rendered sidebar component.
 */

function SideBar({ isSideBarOpen, setSideBarOpen }) {
  const userInfo = useSelector((state) => state.user);
  const [userName, setUserName] = useState("");
  const [profileIcon, setProfileIcon] = useState("");

  const checkUserInfo = async () => {
    if (isEmptyCheck(userInfo.name)) {
      setUserName("User");
    } else {
      setUserName(userInfo.name);
    }
    if (isEmptyCheck(userInfo.profileImage)) {
      setProfileIcon(dummyProfile);
    } else {
      setProfileIcon(userInfo.profileImage);
    }
  };

  useEffect(() => {
    checkUserInfo();
  }, [userInfo]);

  const location = useLocation();
  return (
    <>
      <div
        className={`SideBarContainer text-light ${!isSideBarOpen ? "collapsed" : "show"}`}
      >
        <div className="sideBarFixed">
          {/* Sidebar Profile Section */}
          <div className="sidebarProfile">
            <div className="profileSide">
              <div className="profileImg">
                <img src={profileIcon} alt="profile" />
              </div>
              <div className="profileText">
                <span>Hey,</span>
                <h4>{userName}</h4>
              </div>
            </div>
          </div>

          {/* Sidebar Navigation Links */}
          <div className="sidebarNav">
            <Link
              className={`sidebarNavItem ${location.pathname === "/dashboard" && "active"}`}
              to="/dashboard"
              onClick={() => setSideBarOpen(!isSideBarOpen)}
            >
              <SideBarUserLogo />
              <span>Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
