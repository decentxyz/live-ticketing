import { DecentSDK } from "@decent.xyz/sdk";
import { toast } from "react-toastify";
import { allChains, useNetwork, useSigner, useAccount } from "wagmi";
import handleTxError from "../lib/handleTxError";
import walletReady from "../lib/walletReady";
import absoluteUrl from "../lib/absoluteUrl";
import { ethers } from "ethers";
import axios from "axios";

const fetchAllowlistProof = async (chainId:any, contract:any, account:any) => {
  try {
    const response = await axios.get(`${absoluteUrl().origin}/api/getAllowlistProof`, {
      params: {
        chainId,
        contract,
        account,
      }
    });

    return(response.data);
  } catch (error) {
    console.error(error);
    return []; // empty proof
  }
}

const MintButton = ({ buttonText, width, edition }:any) => {
  const chainId = 1;
  const { data: signer } = useSigner();
  const { chain: activeChain } = useNetwork();
  const { address } = useAccount();

  const mint = async (contract:any) => {
    console.log('we are minting!!');
    try {
      const price = await contract.tokenPrice();
      const tx = await contract.mint(chainId, { value: price.toString() });
      toast.success("Ticket Claimed!");
    } catch (error) {
      handleTxError(error);
    }
  }

  const mintPresale = async (contract:any) => {
    console.log('checking the presale!!');
    if (signer)
    try {
      const allowlistProof = await fetchAllowlistProof(1, contract.address, address);

      if ( ! allowlistProof?.merkleProof?.length ) {
        throw { message: 'The connected account is not allowlisted for presale mints.'};
      }

      const pricePerToken = ethers.utils.parseEther(allowlistProof.pricePerToken.toString());
      const tx = await contract.mintPresale(
        1,  // quantity || WE MIGHT WANT THIS TO FLEX W FORM,
        allowlistProof.maxQuantity,  // maxQuantity,
        pricePerToken,  // pricePerToken,
        allowlistProof.merkleProof,  // bytes32[] calldata merkleProof
        { value: pricePerToken }
      );
      const receipt = await tx.wait();
      toast.success("Ticket Claimed!");
    } catch (error) {
      handleTxError(error);
    }
  }

  const handleClick = async () => {
    const desiredChain = allChains.find((c) => c.id == chainId);
    if (!walletReady(signer, activeChain))
      return;

    else if (signer && activeChain) {
    const sdk = new DecentSDK(activeChain.id, signer);

    // TODO: REALLY requires a better solution
    // const contract = await getDCNTContract(contract, DCNTContractType, sdk);
    // console.log(contract.interface.format(ethers.utils.FormatTypes.full));
    const abi = [
      "function mint(uint256 numberOfTokens) payable",
      "function mintPresale(uint256 quantity, uint256 maxQuantity, uint256 pricePerToken, bytes32[] merkleProof) payable",
      "function presaleEnd() view returns (uint256)",
      "function tokenPrice() view returns (uint256)"
    ];
    const contract = new ethers.Contract(edition, abi, signer);

      try {
        const contractPresaleEnd = parseInt(await contract.presaleEnd());
        let presaleEnd = new Date(0);
        presaleEnd.setUTCSeconds(contractPresaleEnd);
        presaleEnd = new Date(Math.floor(presaleEnd.getTime() / 1000));
        const now = new Date(Math.floor((new Date()).getTime() / 1000));

        now < presaleEnd
          ? await mintPresale(contract)
          : await mint(contract);
      } catch (error) {
        mint(contract);
      }
    }
  };

  return <button className={width} onClick={handleClick}>{buttonText}</button>;
};

export default MintButton;