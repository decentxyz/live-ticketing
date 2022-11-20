import { toast } from "react-toastify";

const walletReady = (
  signer:any,
  activeChain:any,
) => {
  if (!signer) {
    toast.error("Please connect wallet.");
    return;
  }
  if (activeChain.id !== 1) {
    toast.error(`Wrong network. Please switch to Ethereum`);
    return;
  }
  return true;
};

export default walletReady;