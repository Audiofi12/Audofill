import React, { useState } from 'react';
import { getSigner, getAAWalletAddress } from '@/utils/aaUtils';
import { Button } from "@/components/ui/button";
 
const AAWalletConnect: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [aaWalletAddress, setAAWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 
  const connectWallet = async () => {
    try {
      setIsLoading(true);
      
      // Get signer from browser wallet
      const signer = await getSigner();
      const address = await signer.getAddress();
      setUserAddress(address);
      
      // Get AA wallet address
      const aaAddress = await getAAWalletAddress(signer);
      setAAWalletAddress(aaAddress);
      
      setIsConnected(true);
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      alert(error.message || "Failed to connect wallet");
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <div className="wallet-container">
      <div className="connect-section">
        <Button 
          className="bg-blue-600 text-[13px]"
          onClick={connectWallet}
          disabled={isLoading || isConnected}
        >
          {isLoading ? "Connecting..." : isConnected ? "Connected" : "Connect Wallet"}
        </Button>
      </div>
      
      {/* {isConnected && (
        <div className="wallet-info">
          <div className="address-item">
            <strong>EOA Address:</strong> 
            <span>{userAddress}</span>
          </div>
          <div className="address-item">
            <strong>AA Wallet Address:</strong> 
            <span>{aaWalletAddress}</span>
          </div>
          <p className="note">
            This AA wallet is counterfactual and will be deployed on your first transaction.
          </p>
        </div>
      )} */}
    </div>
  );
};
 
export default AAWalletConnect;