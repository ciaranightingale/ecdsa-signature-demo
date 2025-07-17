import { useState, useEffect } from 'react';
import { getEthereumAddress } from '../utils/crypto';

interface PublicKey {
  id: string;
  key: string;
  compressed: boolean;
}

interface Address {
  id: string;
  address: string;
  sourceKeyId: string;
}

interface AddressGeneratorProps {
  publicKeys: PublicKey[];
}

export default function AddressGenerator({ publicKeys }: AddressGeneratorProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    if (publicKeys.length === 0) {
      setAddresses([]);
    }
  }, [publicKeys.length]);

  const generateAddresses = () => {
    const newAddresses: Address[] = [];
    
    publicKeys.forEach(publicKey => {
      const ethereumAddress = getEthereumAddress(publicKey.key);
      
      newAddresses.push({
        id: `ethereum-${publicKey.id}`,
        address: ethereumAddress,
        sourceKeyId: publicKey.id
      });
    });
    
    setAddresses(newAddresses);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getSourceKeyInfo = (sourceKeyId: string) => {
    const sourceKey = publicKeys.find(key => key.id === sourceKeyId);
    return sourceKey ? 'Public Key' : 'Unknown';
  };

  return (
    <div className="bg-navy-800 rounded-lg shadow-lg p-8 border border-navy-700">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-baby-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">3</span>
        </div>
        <h2 className="text-2xl font-bold text-white">Generate Address</h2>
      </div>

      {publicKeys.length === 0 ? (
        <div className="text-center py-8 text-baby-blue-400">
          <p>Generate a public key first to create an address</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-sm text-baby-blue-300 mb-4">
            <p>Generate an Ethereum address from your public key:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Ethereum addresses use Keccak256 hash of the public key</li>
              <li>The address is the last 20 bytes of the hash</li>
            </ul>
          </div>

          <button
            onClick={generateAddresses}
            className="bg-baby-blue-500 hover:bg-baby-blue-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 border border-baby-blue-500 hover:border-baby-blue-600 focus:outline-none focus:ring-2 focus:ring-baby-blue-500 focus:ring-offset-2 focus:ring-offset-navy-800"
          >
            Generate Address
          </button>

          <div className="space-y-4">
            {addresses.map((address) => (
              <div key={address.id} className="bg-navy-700 p-4 rounded-lg border border-navy-600">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-purple-500/20 text-purple-300">
                      Ethereum Address
                    </span>
                    <span className="text-xs text-baby-blue-400">
                      from {getSourceKeyInfo(address.sourceKeyId)}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(address.address)}
                    className="bg-baby-blue-500 hover:bg-baby-blue-600 text-white px-3 py-3 rounded-md text-sm transition-colors duration-200 border border-baby-blue-500 hover:border-baby-blue-600 focus:outline-none focus:ring-2 focus:ring-baby-blue-500 focus:ring-offset-2 focus:ring-offset-navy-700"
                    title="Copy to clipboard"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                <div className="font-mono text-sm break-all bg-navy-600 p-4 rounded-lg border border-navy-500 text-baby-blue-300">
                  {address.address}
                </div>
                <p className="text-xs text-baby-blue-400 mt-2">
                  Length: {address.address.length} characters
                </p>
              </div>
            ))}
          </div>

          {addresses.length === 0 && (
            <div className="text-center py-8 text-baby-blue-400">
              <p>No address generated yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}