import React from 'react';
import { Wallet } from 'lucide-react';
import './WalletConnect.css';

const WalletConnect = ({ onConnect, address, isConnecting }) => {
  return (
    <div className="wallet-connect-wrapper">
      {!address ? (
        <button 
          className="btn btn-primary wallet-btn" 
          onClick={onConnect}
          disabled={isConnecting}
        >
          <Wallet size={20} />
          {isConnecting ? 'Connecting...' : 'Login with MetaMask'}
        </button>
      ) : (
        <div className="wallet-connected glass-panel">
          <div className="connected-indicator"></div>
          <span className="address-text">
            {address.substring(0, 6)}...{address.substring(address.length - 4)}
          </span>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
