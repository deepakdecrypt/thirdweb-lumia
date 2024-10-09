import React, { useState, useEffect } from "react";
import { ConnectEmbed } from "thirdweb/react";
import { client } from "../../config/client";
import wallets from "../../config/wallets";
import eventEmitter from "./eventEmitter";
import {
  logoutWallet,
  checkWalletLoggedIn,
  thirdwebAuth,
} from "../../utils/authUtils";
import { lumiaChainTestNet, lumiaChainMainNet } from "../../config/lumiaChain";
import { ethereum } from "thirdweb/chains";
import { isEmptyCheck } from "../../utils/validation";
import { darkTheme } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";
import Cookies from "js-cookie";

export default function ThirdWebModal() {
  const activeAccount = useActiveAccount();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const initialize = async () => {
      console.log("ActiveAccount Modal ", activeAccount);
      if (activeAccount) {
        await checkLoggedIn();
        if (isLoggedIn && walletAddress) {
          await goToDashboard();
        }
      }
    };
    initialize();
  }, [isLoggedIn, walletAddress]);

  const login = async (payload) => {
    try {
      const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
      if (verifiedPayload.valid) {
        const jwt = await thirdwebAuth.generateJWT({
          payload: verifiedPayload.payload,
        });
        Cookies.set("jwtLumiaThirdWeb", jwt);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Login error:", error.message);
      // Additional error handling, like showing a toast or alert, can be added here.
    }
  };

  const customTheme = darkTheme({
    colors: {
      primaryButtonBg: "#ffffff",
      primaryButtonText: "#000000",
      accentButtonBg: "#ffffff",
      accentButtonText: "#000000",
      accentText: "#ffffff",
      secondaryButtonBg: "#ffffff",
      secondaryButtonHoverBg: "#ffffff",
      secondaryButtonText: "#000000",
    },
  });

  const checkLoggedIn = async () => {
    const statusCode = await checkWalletLoggedIn();
    setIsLoggedIn(statusCode);
  };

  const goToDashboard = async () => {
    try {
      eventEmitter.emit("userConnected", "User logged in to ThirdWeb");
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Dashboard redirection error:", error.message);
    }
  };

  // Reusable function to handle auth operations
  const handleOnConnect = {
    getAccount: async (account) => {
      console.log("accountaccount ", account);
    },
  };

  // Reusable function to handle auth operations
  const handleAuth = {
    getLoginPayload: async (params) => {
      console.log("getLoginPayload called");
      try {
        setWalletAddress(params.address);
        const payload = await thirdwebAuth.generatePayload(params);
        console.log("payload is", payload);
        return payload;
      } catch (error) {
        console.error("getLoginPayload error:", error.message);
        return null; // or handle accordingly
      } finally {
        console.log("getLoginPayload completed");
      }
    },
    doLogin: async (params) => {
      console.log("doLogin called");
      try {
        await login(params);
      } catch (error) {
        console.error("doLogin error:", error.message);
      } finally {
        console.log("doLogin completed");
      }
    },
    isLoggedIn: async () => {
      console.log("isLoggedIn called");
      try {
        return isLoggedIn;
      } catch (error) {
        console.error("isLoggedIn error:", error.message);
        return false;
      } finally {
        console.log("isLoggedIn completed");
      }
    },
    doLogout: async () => {
      console.log("doLogout called");
      try {
        await logout();
      } catch (error) {
        console.error("doLogout error:", error.message);
      } finally {
        console.log("doLogout completed");
      }
    },
  };

  // Reusable component for ConnectEmbed
  const ConnectEmbedComponent = ({ walletsConfig }) => (
    <ConnectEmbed
      theme={customTheme}
      client={client}
      wallets={walletsConfig}
      modalSize="compact"
      autoConnect={true}
      showAllWallets={false}
      chains={[ethereum, lumiaChainMainNet]}
      className="thirdwebConnectBox"
      showThirdwebBranding={false}
      header={false}
      onConnect={handleOnConnect}
      auth={handleAuth}
    />
  );

  return (
    <>
      {/* Render reusable ConnectEmbed components */}
      <ConnectEmbedComponent walletsConfig={wallets} />
    </>
  );
}
