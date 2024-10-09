// authUtils.js
import { createAuth } from "thirdweb/auth";
import Cookies from "js-cookie";
import { privateKeyToAccount } from "thirdweb/wallets";
import eventEmitter from "../components/CommonComponents/eventEmitter";
import { client } from "../config/client";

export const thirdwebAuth = createAuth({
  domain: "Lumia Demo",
  client,
  adminAccount: privateKeyToAccount({
    client,
    privateKey: import.meta.env.VITE_THIRD_PRIVATE_KEY,
  }),
});

export const logoutWallet = async () => {
  localStorage.clear();
  clearLocalStorageAndCookies();
  eventEmitter.emit("userDisconneted", "User logged out from thirdweb");
  window.location.href = "/";
};

export const checkWalletLoggedIn = async () => {
  try {
    const jwt = Cookies.get("jwtLumiaThirdWeb");
    if (!jwt) {
      clearLocalStorageAndCookies();
      return false;
    }

    const authResult = await thirdwebAuth.verifyJWT({ jwt });
    if (!authResult.valid) {
      clearLocalStorageAndCookies();
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error checking login status:", error);
    clearLocalStorageAndCookies();
    return false;
  }
};

export const clearLocalStorageAndCookies = () => {
  clearAllCookies();
};

const clearAllCookies = () => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
};
