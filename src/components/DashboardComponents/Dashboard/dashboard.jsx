import React from "react";
import OverviewImg from "../../../assets/dashBoardOverview.png";
import { ethereum } from "thirdweb/chains";
import { useActiveAccount } from "thirdweb/react";
import { lumiaChainMainNet } from "../../../config/lumiaChain";
import { useActiveWalletChain } from "thirdweb/react";
import ThirdWebAutoConnect from "../../CommonComponents/ThirdWebAutoConnect";
import { useSwitchActiveWalletChain } from "thirdweb/react";

/**
 * DashboardLandingPage Component
 *
 * This component renders the main landing page for the dashboard.
 * It includes an overview section with metrics and user activity tabs.
 * Currently this is a static page, will be updated in future
 * Page sections will be turned to components and will be imported on top.
 *
 * @returns {JSX.Element} The rendered dashboard landing page component.
 */

function DashboardLandingPage() {
  const ActiveAccount = useActiveAccount();
  const activeChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();

  const switchToPrism = async () => {
    console.log("switchToPrism ActiveAccount ", ActiveAccount);
    console.log("switchToPrism activeChain ", activeChain);
    try {
      console.log("chain change called ethereum");
      const networkChange = await switchChain(lumiaChainMainNet);
      console.log("networkChange ethereum", networkChange);
      console.log("switchToEthereum activeChain ", activeChain);
      // window.location.reload();
    } catch (error) {
      console.log("Error in Switch chain to switchToPrism", error);
    }
  };

  const switchToEthereum = async () => {
    console.log("switchToEthereum ActiveAccount ", ActiveAccount);
    console.log("switchToEthereum activeChain ", activeChain);
    try {
      console.log("chain change called ethereum");
      const networkChange = await switchChain(ethereum);
      console.log("networkChange ethereum", networkChange);
      console.log("switchToEthereum activeChain ", activeChain);
      // window.location.reload();
    } catch (error) {
      console.log("Error in Switch chain to switchToEthereum", error);
    }
  };

  return (
    <>
      {/* Dashboard Heading Section */}
      <ThirdWebAutoConnect />

      <div className="dashboardHeading">
        <div className="d-flex align-items-center " style={{ gap: "19px" }}>
          <img src={OverviewImg} alt="Asset Overview" className="img-fluid" />
          <h3>Dashboard</h3>
        </div>
      </div>

      <div className="settingPageContainer">
        <button
          className="dashboardWhiteBtn"
          style={{ minWidth: "250px" }}
          onClick={() => {
            switchToEthereum();
          }}
        >
          Switch To Ethereum
        </button>
        <br></br>
        <br></br>
        <button
          className="dashboardWhiteBtn"
          style={{ minWidth: "250px" }}
          onClick={() => {
            switchToPrism();
          }}
        >
          Switch To Prism
        </button>
      </div>
    </>
  );
}

export default DashboardLandingPage;
