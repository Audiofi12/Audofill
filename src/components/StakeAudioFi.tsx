// components/StakeAudioFi.tsx
import { useState } from "react";
import { ethers } from "ethers";
import { getSigner, getAAWalletAddress } from '@/utils/aaUtils';
import stakingABI from "@/abi/MusicStaking.json";
import erc20ABI from "@/abi/ERC20.json"; // Standard ERC20 ABI with approve()
import { CONTRACT_ADDRESSES } from '@/config';

const AUDIOFI_TOKEN_ADDRESS = CONTRACT_ADDRESSES.AUDIOFI_TOKEN_ADDRESS;
const STAKING_CONTRACT_ADDRESS = CONTRACT_ADDRESSES.STAKING_CONTRACT_ADDRESS;

const StakeAudioFi: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [contentId, setContentId] = useState<string>("");

  const handleStake = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");

    const signer = await getSigner();
    const tokenContract = new ethers.Contract(AUDIOFI_TOKEN_ADDRESS, erc20ABI, signer);
    const stakingContract = new ethers.Contract(STAKING_CONTRACT_ADDRESS, stakingABI, signer);

    try {
      const amountInWei = ethers.utils.parseEther(amount);

      // // 1. Approve token transfer
      // const approveTx = await tokenContract.approve(STAKING_CONTRACT_ADDRESS, amountInWei);
      // await approveTx.wait();

      // 2. Stake tokens
      const stakeTx = await stakingContract.stake(contentId, amountInWei);
      await stakeTx.wait();

      alert("Staked successfully!");
    } catch (err) {
      console.error("Stake error:", err);
      alert("Staking failed. See console for details.");
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Content ID"
        value={contentId}
        onChange={(e) => setContentId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount to Stake"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleStake}>Stake AFT</button>
    </div>
  );
};

export default StakeAudioFi;
