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
  const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);

  useEffect(() => {
    if (!privateKey) {
      setPublicKeys([]);
      onPublicKeysChange([]);
    }
  }, [privateKey]); // Remove onPublicKeysChange from dependencies

  const addPublicKey = () => {
    if (!privateKey) return;
    
    const newKey = getPublicKey(privateKey);
    const newPublicKey: PublicKey = {
      id: `public-key-${Date.now()}`,
      key: newKey,
      compressed: false
    };
    
    const updatedKeys = [...publicKeys, newPublicKey];
    setPublicKeys(updatedKeys);
    onPublicKeysChange(updatedKeys);
  };

  const removePublicKey = (id: string) => {
    const updatedKeys = publicKeys.filter(key => key.id !== id);
    setPublicKeys(updatedKeys);
    onPublicKeysChange(updatedKeys);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-navy-800 rounded-lg shadow-lg p-8 border border-navy-700">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-baby-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
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
            onClick={addPublicKey}
            className="bg-baby-pink-500 hover:bg-baby-pink-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 border border-baby-pink-500 hover:border-baby-pink-600 focus:outline-none focus:ring-2 focus:ring-baby-pink-500 focus:ring-offset-2 focus:ring-offset-navy-800"
          >
            Generate Public Key
          </button>

          <div className="space-y-4">
            {publicKeys.map((publicKey) => (
              <div key={publicKey.id} className="bg-navy-700 p-4 rounded-lg border border-navy-600">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-white">
                    Public Key
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(publicKey.key)}
                      className="bg-baby-blue-500 hover:bg-baby-blue-600 text-white px-3 py-3 rounded-md text-sm transition-colors duration-200 border border-baby-blue-500 hover:border-baby-blue-600 focus:outline-none focus:ring-2 focus:ring-baby-blue-500 focus:ring-offset-2 focus:ring-offset-navy-700"
                      title="Copy to clipboard"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => removePublicKey(publicKey.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-3 rounded-md text-sm transition-colors duration-200 border border-red-500 hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-navy-700"
                      title="Remove key"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="font-mono text-sm break-all bg-navy-600 p-4 rounded-lg border border-navy-500 text-baby-blue-300">
                  {publicKey.key}
                </div>
                <p className="text-xs text-baby-blue-400 mt-2">
                  Length: {publicKey.key.length} characters
                </p>
              </div>
            ))}
          </div>

          {publicKeys.length === 0 && (
            <div className="text-center py-8 text-baby-blue-400">
              <p>No public key generated yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}