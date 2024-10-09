/**
 * LandingPage Component
 *
 * This component represents the landing page of the application.
 * It includes a central section with a title, subtitle, and a call-to-action button integrated with thirdweb.
 *
 * @export
 * @returns {JSX.Element} - The landing page component.
 */

import React, { useState, useEffect } from "react";
import ThirdWebModal from "../../CommonComponents/ThirdWebModal";
import { LumiaLogo } from "../../../assets/svg";
import { checkIfUserLoggedIn } from "../../../services/authServices";
import { useActiveAccount } from "thirdweb/react";
import ThirdWebAutoConnect from "../../CommonComponents/ThirdWebAutoConnect";

function LandingPage() {
  const ActiveAccount = useActiveAccount();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserLogIn = async () => {
      if (!userLoggedIn && ActiveAccount) {
        const { statusCode } = await checkIfUserLoggedIn();
        if (statusCode === 200) {
          setUserLoggedIn(true);
          window.location.href = "/dashboard";
          return;
        } else {
          setUserLoggedIn(false);
        }
      }
    };
    checkUserLogIn();
  }, [ActiveAccount]);

  return (
    <>
      {!userLoggedIn && (
        <>
          <ThirdWebAutoConnect />
          {/* Inner container for the main content */}
          <div className="innerContainer">
            <div className="landingBox">
              <div style={{ margin: "auto" }}>
                <div className="logoDiv">
                  <LumiaLogo />
                </div>
                <div className="greetingsDiv" style={{ marginTop: "70px" }}>
                  <h2>Welcome Back</h2>
                  <p>To your Lumia Dashboard</p>
                </div>
                <ThirdWebModal />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default LandingPage;
