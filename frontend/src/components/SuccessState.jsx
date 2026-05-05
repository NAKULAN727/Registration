import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle, Hash, Wallet, ArrowRight, Key, Eye, EyeOff } from 'lucide-react';
import './SuccessState.css';

const SuccessState = ({ walletAddress, transactionHash, privateKey, onReset }) => {
  const [showKey, setShowKey] = useState(false);
  const qrData = JSON.stringify({
    blockchainId: walletAddress,
    ...(transactionHash && { transactionHash })
  });

  return (
    <div className="success-container glass-panel">
      <div className="success-header">
        <div className="success-icon-wrapper">
          <CheckCircle size={64} className="success-icon" />
        </div>
        <h2 className="success-title">Registration Successful!</h2>
        <p className="success-subtitle">Your data has been securely recorded on the blockchain and synced with the Police Dashboard.</p>
      </div>

      <div className="success-details-grid">
        <div className="qr-section glass-panel-inner">
          <h3 className="section-heading">Smart ID QR Code</h3>
          <div className="qr-code-wrapper">
            <QRCodeSVG 
              value={qrData} 
              size={180} 
              bgColor="#ffffff"
              fgColor="#000000"
              level="M"
              includeMargin={true}
            />
          </div>
          <p className="qr-hint">Scan this QR code for instant verification</p>
        </div>

        <div className="info-section">
          <div className="info-card glass-panel-inner">
            <div className="info-card-header">
              <Wallet size={20} className="text-primary" />
              <span>Wallet Address</span>
            </div>
            <div className="info-card-value font-mono">
              {walletAddress}
            </div>
          </div>

          {transactionHash && (
            <div className="info-card glass-panel-inner">
              <div className="info-card-header">
                <Hash size={20} className="text-primary" />
                <span>Transaction Hash</span>
              </div>
              <div className="info-card-value font-mono">
                <a 
                  href={`https://sepolia.etherscan.io/tx/${transactionHash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="tx-link"
                >
                  {transactionHash.substring(0, 16)}...{transactionHash.substring(transactionHash.length - 16)}
                </a>
              </div>
            </div>
          )}

          {privateKey && (
            <div className="info-card glass-panel-inner warning-card">
              <div className="info-card-header text-warning">
                <Key size={20} />
                <span>Private Key (SAVE THIS!)</span>
              </div>
              <div className="info-card-value font-mono private-key-display">
                {showKey ? privateKey : '••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••'}
                <button type="button" className="btn-icon" onClick={() => setShowKey(!showKey)}>
                  {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="warning-text">This key will never be shown again. You need it to log in later.</p>
            </div>
          )}
          
          <button className="btn btn-primary btn-done" onClick={onReset}>
            Register Another Tourist <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessState;
