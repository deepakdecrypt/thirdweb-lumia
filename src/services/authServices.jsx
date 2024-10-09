import { checkWalletLoggedIn } from "../utils/authUtils";

export const checkIfUserLoggedIn = async () => {
  const statusCode = await checkWalletLoggedIn();
  if (statusCode) {
    return { statusCode: 200, response: statusCode, error: null };
  } else {
    return { statusCode: 401, error: "User is not Logged in" };
  }
};
