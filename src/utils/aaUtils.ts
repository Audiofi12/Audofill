import { ethers } from 'ethers';
import { Client, Presets } from 'userop';
import { NERO_CHAIN_CONFIG, AA_PLATFORM_CONFIG, CONTRACT_ADDRESSES, API_KEY } from '@/config';
import stakingABI from "@/abi/MusicStaking.json";
import erc20ABI from "@/abi/ERC20.json"; // Standard ERC20 ABI with approve()

// Get Ethereum provider
export const getProvider = () => {
  return new ethers.providers.JsonRpcProvider(NERO_CHAIN_CONFIG.rpcUrl);
};

// Get signer from browser wallet
export const getSigner = async () => {
  if (!window.ethereum) {
    throw new Error("No crypto wallet found. Please install Metamask.");
  }

  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider.getSigner();
};

// Initialize AA Client
export const initAAClient = async (accountSigner: ethers.Signer) => {
  return await Client.init(NERO_CHAIN_CONFIG.rpcUrl, {
    overrideBundlerRpc: AA_PLATFORM_CONFIG.bundlerRpc,
    entryPoint: CONTRACT_ADDRESSES.entryPoint,
  });
};

// Get AA wallet address for a signer
export const getAAWalletAddress = async (accountSigner: ethers.Signer, apiKey?: string) => {
  try {
    // Initialize the SimpleAccount builder
    const simpleAccount = await Presets.Builder.SimpleAccount.init(
      accountSigner,
      NERO_CHAIN_CONFIG.rpcUrl,
      {
        overrideBundlerRpc: AA_PLATFORM_CONFIG.bundlerRpc,
        entryPoint: CONTRACT_ADDRESSES.entryPoint,
        factory: CONTRACT_ADDRESSES.accountFactory,
      }
    );

    // Get the counterfactual address of the AA wallet
    const address = await simpleAccount.getSender();
    console.log("AA wallet address:", address);

    return address;
  } catch (error) {
    console.error("Error getting AA wallet address:", error);
    throw error;
  }
};
// Function to execute a contract call via AA with sponsored gas
export const executeSponsoredOperation = async (
  accountSigner: ethers.Signer,
  contractAddress: string,
  contractAbi: any,
  functionName: string,
  functionParams: any[],
  options?: {
    apiKey?: string;
    gasMultiplier?: number;
  }
) => {
  try {
    // Initialize AA client
    const client = await Client.init(NERO_CHAIN_CONFIG.rpcUrl, {
      overrideBundlerRpc: AA_PLATFORM_CONFIG.bundlerRpc,
      entryPoint: CONTRACT_ADDRESSES.entryPoint,
    });

    // Initialize AA builder
    const builder = await Presets.Builder.SimpleAccount.init(
      accountSigner,
      NERO_CHAIN_CONFIG.rpcUrl,
      {
        overrideBundlerRpc: AA_PLATFORM_CONFIG.bundlerRpc,
        entryPoint: CONTRACT_ADDRESSES.entryPoint,
        factory: CONTRACT_ADDRESSES.accountFactory,
      }
    );

    // Configure gas parameters
    const gasParams = {
      callGasLimit: "0x88b8",
      verificationGasLimit: "0x33450",
      preVerificationGas: "0xc350",
      maxFeePerGas: "0x2162553062",
      maxPriorityFeePerGas: "0x40dbcf36",
    };

    // Set gas parameters
    builder.setCallGasLimit(gasParams.callGasLimit);
    builder.setVerificationGasLimit(gasParams.verificationGasLimit);
    builder.setPreVerificationGas(gasParams.preVerificationGas);
    builder.setMaxFeePerGas(gasParams.maxFeePerGas);
    builder.setMaxPriorityFeePerGas(gasParams.maxPriorityFeePerGas);

    // Configure paymaster for sponsored transactions (free)
    const paymasterOptions = {
      apikey: options?.apiKey || API_KEY,
      rpc: AA_PLATFORM_CONFIG.paymasterRpc,
      type: "0" // Type 0 = sponsored/free gas
    };

    // Set paymaster options
    builder.setPaymasterOptions(paymasterOptions);

    // Create contract instance
    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      ethers.getDefaultProvider()
    );

    // Encode function call
    const callData = contract.interface.encodeFunctionData(
      functionName,
      functionParams
    );

    // Create the UserOperation
    const userOp = await builder.execute(contractAddress, 0, callData);

    console.log("Sending UserOperation to paymaster...");

    // Send the UserOperation
    const res = await client.sendUserOperation(userOp);
    console.log("UserOperation sent with hash:", res.userOpHash);

    // Wait for the transaction to be included
    const receipt = await res.wait();
    if (!receipt) {
      throw new Error("Transaction receipt is null");
    }
    console.log("Transaction mined in block:", receipt.blockNumber);

    return {
      userOpHash: res.userOpHash,
      transactionHash: receipt.transactionHash,
      receipt: receipt
    };
  } catch (error) {
    console.error("Error executing operation:", error);
    throw error;
  }
};

export const stake = async (
  accountSigner: ethers.Signer,
  address: string,
  contentId: number,
  amount: ethers.BigNumber,
  options?: {
    apiKey?: string;
    gasMultiplier?: number;
  }
) => {
  try {
    // Execute the mint function with sponsored gas
    return await executeSponsoredOperation(
      accountSigner,
      CONTRACT_ADDRESSES.STAKING_CONTRACT_ADDRESS,
      stakingABI,
      'stake',
      [address, contentId, amount],
      options
    );
  } catch (error) {
    console.error("Error staking:", error);
    throw error;
  }
};

export const unstake = async (
  accountSigner: ethers.Signer,
  address: string,
  contentId: number,
  options?: {
    apiKey?: string;
    gasMultiplier?: number;
  }
) => {
  try {
    // Execute the mint function with sponsored gas
    return await executeSponsoredOperation(
      accountSigner,
      CONTRACT_ADDRESSES.STAKING_CONTRACT_ADDRESS,
      stakingABI,
      'unstake',
      [address, contentId],
      options
    );
  } catch (error) {
    console.error("Error unstakeing:", error);
    throw error;
  }
};