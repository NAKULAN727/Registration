import React, { useState } from 'react';
import './App.css';
import WalletConnect from './components/WalletConnect';
import RegistrationForm from './components/RegistrationForm';
import SuccessState from './components/SuccessState';
import { connectWallet, simulateRegistrationTransaction, generateNewWallet } from './utils/web3';
import { AlertCircle } from 'lucide-react';

function App() {
  const [wallet, setWallet] = useState({
    address: null,
    provider: null,
    signer: null
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null); // { transactionHash, ...formData }

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    setError(null);
    const result = await connectWallet();
    
    if (result.error) {
      setError(result.error);
    } else {
      setWallet({
        address: result.address,
        provider: result.provider,
        signer: result.signer
      });
    }
    setIsConnecting(false);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      let finalAddress = wallet.address;
      let finalTxHash = null;
      let newlyGeneratedPrivateKey = null;

      if (wallet.signer) {
        // Path 2: MetaMask is connected
        const txResult = await simulateRegistrationTransaction(wallet.signer);
        if (!txResult.success) {
          throw new Error(txResult.error || "Transaction failed");
        }
        finalTxHash = txResult.hash;
      } else {
        // Path 1: Normal Registration (Generate IDs)
        const newWallet = generateNewWallet();
        finalAddress = newWallet.address;
        newlyGeneratedPrivateKey = newWallet.privateKey;
      }

      // Send Data to Backend (wrapped in try/catch to not block UI if backend is down)
      try {
        const payload = {
          name: formData.name,
          email: formData.email,
          phone: formData.contactNumber,
          blockchainId: finalAddress,
          tripDetails: {
            destination: formData.plannedItinerary || 'Not specified',
            startDate: formData.arrivalDate,
            endDate: formData.departureDate
          },
          guardianName: formData.familyEmergencyContact || formData.localEmergencyContact,
          guardianPhone: formData.familyEmergencyPhone || formData.localEmergencyPhone,
          ...(finalTxHash && { transactionHash: finalTxHash })
        };

        const response = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.warn("Backend returned error:", errorData.message);
          // We won't throw here so the user can still see the generated IDs/Success state
        }
      } catch (fetchErr) {
        console.warn("Failed to fetch from backend (Is it running? CORS issue?). Proceeding to Success UI anyway for demonstration.", fetchErr);
      }

      // Show Success State
      setSuccessData({
        walletAddress: finalAddress,
        transactionHash: finalTxHash,
        privateKey: newlyGeneratedPrivateKey
      });

    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred during registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccessData(null);
    setError(null);
    setWallet({ address: null, provider: null, signer: null });
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="header-title">Web3 Smart Tourist Registry</h1>
        <p className="header-subtitle">Secure blockchain-based registration synced with the Police Dashboard.</p>
      </header>

      <main className="main-content">
        {/* Removed duplicate wallet container */}

        {error && (
          <div className="error-message">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {successData ? (
          <SuccessState 
            walletAddress={successData.walletAddress}
            transactionHash={successData.transactionHash}
            privateKey={successData.privateKey}
            onReset={handleReset}
          />
        ) : (
          <RegistrationForm 
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
            walletAddress={wallet.address}
            onConnectWallet={handleConnectWallet}
            isConnecting={isConnecting}
          />
        )}
      </main>
    </div>
  );
}

export default App;
