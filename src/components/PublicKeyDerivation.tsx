import { useState, useEffect } from 'react';
import { getPublicKey } from '../utils/crypto';

interface PublicKey {
  id: string;
  key: string;
  compressed: boolean;
}

interface PublicKeyDerivationProps {
  privateKey: string;
  onPublicKeysChange: (publicKeys: PublicKey[]) => void;
}

export default function PublicKeyDerivation({ privateKey, onPublicKeysChange }: PublicKeyDerivationProps) {
  const [publicKey, setPublicKey] = useState<string>('');

  useEffect(() => {
    if (!privateKey) {
      setPublicKey('');
      onPublicKeysChange([]);
    }
  }, [privateKey]);

  const generatePublicKey = () => {
    if (!privateKey) return;
    
    const newKey = getPublicKey(privateKey);
    setPublicKey(newKey);
    
    // Keep the same interface for the parent component
    const publicKeyObj: PublicKey = {
      id: 'main-public-key',
      key: newKey,
      compressed: false
    };
    onPublicKeysChange([publicKeyObj]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };


  return (
    <div className="bg-navy-800 rounded-lg shadow-lg p-8 border border-navy-700">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-hot-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">2</span>
        </div>
        <h2 className="text-2xl font-bold text-white">Derive Public Key</h2>
      </div>

      {!privateKey ? (
        <div className="text-center py-8 text-baby-blue-400">
          <p>Generate a private key first to derive a public key</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-sm text-baby-blue-300 mb-4">
            <p>Generate a public key from your private key:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Public keys are derived using elliptic curve cryptography</li>
              <li>The public key can be safely shared and used to verify signatures</li>
            </ul>
          </div>

          <button
            onClick={generatePublicKey}
            className="w-full bg-hot-pink-500 hover:bg-hot-pink-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 border border-hot-pink-500 hover:border-hot-pink-600 focus:outline-none focus:ring-2 focus:ring-hot-pink-500 focus:ring-offset-2 focus:ring-offset-navy-800"
          >
            Generate Public Key
          </button>

          {publicKey ? (
            <div className="bg-navy-700 p-4 rounded-lg border border-navy-600">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-white">
                  Public Key
                </span>
                <button
                  onClick={() => copyToClipboard(publicKey)}
                  className="bg-baby-blue-500 hover:bg-baby-blue-600 text-white px-3 py-3 rounded-md text-sm transition-colors duration-200 border border-baby-blue-500 hover:border-baby-blue-600 focus:outline-none focus:ring-2 focus:ring-baby-blue-500 focus:ring-offset-2 focus:ring-offset-navy-700"
                  title="Copy to clipboard"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <div className="font-mono text-sm break-all bg-navy-600 p-4 rounded-lg border border-navy-500 text-baby-blue-300">
                {publicKey}
              </div>
              <p className="text-xs text-baby-blue-400 mt-2">
                Length: {publicKey.replace('0x', '').length / 2} bytes (uncompressed)
              </p>
            </div>
          ) : (
            <div className="text-center py-8 text-baby-blue-400">
              <p>No public key generated yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}