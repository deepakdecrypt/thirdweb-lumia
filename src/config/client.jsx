import { createThirdwebClient } from "thirdweb";

const clientId = import.meta.env.VITE_THIRD_WEB_CLIENT_ID;

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({ clientId });
