/**
 * HeaderNav Component
 *
 * This component renders the navigation bar for the application. It includes the Lumia logo,
 * navigation links, and a call to action button. The navigation bar is responsive, with a toggle button
 * for collapsing the navigation links on smaller screens.
 *
 * @export
 * @returns {JSX.Element} - The header navigation component.
 */

import React, { useEffect, useState, startTransition } from "react";
import {
  HeaderNavToggle,
  LumiaLogo,
  SideBarHeaderMenuToggle,
} from "../../../assets/svg";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom/dist";
import { dummyProfile } from "../../../config/constant";
import ConfirmationPopup from "../../CommonComponents/ConfirmationPopup";
import { useDispatch } from "react-redux";
import { clearUserData, setUserData } from "../../../redux/userSlice";
import { logoutWallet } from "../../../utils/authUtils";
import eventEmitter from "../../CommonComponents/eventEmitter";
import { checkIfUserLoggedIn } from "../../../services/authServices";

function HeaderNav({ isSideBarOpen, setSideBarOpen }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [profileIcon, setProfileIcon] = useState(dummyProfile);
  const location = useLocation();

  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleSibeBarNav = () => {
    startTransition(() => {
      setSideBarOpen(!isSideBarOpen);
      const navbarCollapse = document.getElementById("navbarSupportedContent");
      if (navbarCollapse.classList.contains("show")) {
        const bootstrapCollapse = new window.bootstrap.Collapse(navbarCollapse);
        bootstrapCollapse.hide();
      }
    });
    setSideBarOpen(!isSideBarOpen);
  };

  useEffect(() => {
    const checkUserLogIn = async () => {
      if (!userLoggedIn) {
        const { statusCode } = await checkIfUserLoggedIn();
        if (statusCode === 200) {
          setUserLoggedIn(true);
        }
      }
    };
    checkUserLogIn();
  }, []);

  const handleShowPopup = () => {
    console.log("Show Popup");
    setPopupVisible(true);
  };

  const handleConfirm = () => {
    // Handle the confirm action
    logoutUserPanel();
    console.log("Confirmed");
    setPopupVisible(false);
  };

  const handleCancel = () => {
    // Handle the cancel action
    console.log("Cancelled");
    setPopupVisible(false);
  };

  const logoutUserPanel = async () => {
    dispatch(clearUserData());
    await logoutWallet();
  };

  eventEmitter.removeAllListeners("logOutUser");
  eventEmitter.on("logOutUser", logoutUserPanel);

  return (
    <>
      <ConfirmationPopup
        isVisible={isPopupVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message="Are you sure you want to log out?"
      />
      <nav className="navbar customNav navbar-expand-lg navbar-dark">
        <div className="container-fluid mobileContainer">
          <div
            className="SideBarToggle"
            onClick={handleSibeBarNav}
            style={{
              opacity:
                userLoggedIn && location.pathname.includes("/dashboard")
                  ? "1"
                  : "0",
            }}
          >
            {userLoggedIn && <SideBarHeaderMenuToggle />}
          </div>
          {/* Logo and home link */}
          <a className="navbar-brand" href={userLoggedIn ? "/dashboard" : "/"}>
            <LumiaLogo />
          </a>

          {/* Toggle button for responsive navigation */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <HeaderNavToggle />
          </button>

          {/* Collapsible navigation links */}
          <div
            className="collapse navGap navbar-collapse"
            id="navbarSupportedContent"
            data-testid="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0"></ul>

            <form className="headerForm" style={{ gap: "9px" }}>
              {userLoggedIn && (
                <div className="profileImg dropdown">
                  <a
                    href="#"
                    id="profileDropdown"
                    role="button"
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src={profileIcon} alt="profile" />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end "
                    aria-labelledby="profileDropdown"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={handleShowPopup}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default HeaderNav;
