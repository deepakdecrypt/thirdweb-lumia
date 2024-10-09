import { AutoConnect } from "thirdweb/react";
import { client } from "../../config/client";
import wallets from "../../config/wallets";
import { lumiaChainMainNet } from "../../config/lumiaChain";
import { ethereum } from "thirdweb/chains";

const ThirdWebAutoConnect = () => {
  return (
    <>
      <AutoConnect
        client={client}
        timeout={10000}
        chains={[lumiaChainMainNet, ethereum]}
        wallets={wallets}
      />
    </>
  );
};

export default ThirdWebAutoConnect;
