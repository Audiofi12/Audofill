// Example usage in a component
import React, { useState } from 'react';
import { getSigner, mintAFT } from '@/utils/aaUtils';
import { NERO_CHAIN_CONFIG, API_KEY } from '@/config';
 
const NFTMinterButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState('');
 
  const handleMint = async () => {
    try {
      setIsLoading(true);
      
      // Get signer from browser wallet
      const signer = await getSigner();
      
      // Define NFT metadata (can be fetched from form)
      const amount = 10;
      
      // Execute the mint operation with sponsored gas
      const result = await mintAFT(
        signer,
        1, // Mint to the connected wallet
        amount,
        { apiKey: API_KEY }
      );
      
    //   setTxHash(result.transactionHash);
      alert("NFT minted successfully!");
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Failed to mint NFT: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <div className="minter-container">
      <button 
        onClick={handleMint}
        disabled={isLoading}
      >
        {isLoading ? "Minting..." : "Mint NFT"}
      </button>
      
      {txHash && (
        <div className="tx-info">
          <p>Transaction successful!</p>
          <a 
            href={`${NERO_CHAIN_CONFIG.explorer}/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Explorer
          </a>
        </div>
      )}
    </div>
  );
};
 
export default NFTMinterButton;