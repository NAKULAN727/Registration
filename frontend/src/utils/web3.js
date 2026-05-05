import { ethers } from 'ethers';

export const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      return { address, provider, signer, error: null };
    } catch (error) {
      console.error('User denied account access', error);
      return { address: null, provider: null, signer: null, error: error.message };
    }
  } else {
    return { address: null, provider: null, signer: null, error: 'Please install MetaMask to use this feature' };
  }
};

export const simulateRegistrationTransaction = async (signer) => {
  try {
    // In a real dApp, you would call a smart contract here.
    // For this requirement, we simulate a transaction by sending 0 ETH to ourselves
    // just to get a transaction hash on the blockchain.
    const address = await signer.getAddress();
    const tx = await signer.sendTransaction({
      to: address,
      value: ethers.parseEther("0"),
      data: ethers.hexlify(ethers.toUtf8Bytes("Tourist Registration"))
    });
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    return { hash: receipt.hash, success: true, error: null };
  } catch (error) {
    console.error('Transaction failed', error);
    return { hash: null, success: false, error: error.message };
  }
};

export const generateNewWallet = () => {
  const newWallet = ethers.Wallet.createRandom();
  return {
    address: newWallet.address,
    privateKey: newWallet.privateKey
  };
};
