import { useState } from 'react';
import { generatePrivateKey } from '../utils/crypto';

interface PrivateKeyGeneratorProps {
  onPrivateKeyGenerated: (privateKey: string) => void;
}

export default function PrivateKeyGenerator({ onPrivateKeyGenerated }: PrivateKeyGeneratorProps) {
  const [privateKey, setPrivateKey] = useState<string>('');
  const [showWarning, setShowWarning] = useState(false);

  const handleGenerateKey = () => {
    setShowWarning(true);
    const newPrivateKey = generatePrivateKey();
    setPrivateKey(newPrivateKey);
    onPrivateKeyGenerated(newPrivateKey);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(privateKey);
  };

  return (
    <div className="bg-navy-800 rounded-lg shadow-lg p-8 border border-navy-700">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-hot-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">1</span>
        </div>
        <h2 className="text-2xl font-bold text-white">Generate Private Key</h2>
      </div>
      
      {showWarning && (
        <div className="bg-red-900/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-6">
          <div className="flex items-start">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div>
              <p className="font-bold text-red-400">Security Warning</p>
              <p className="text-sm">Never share your private key with anyone. This is for educational purposes only. Do not use for real cryptocurrency transactions.</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="text-sm text-baby-blue-300 mb-4">
          <p>Generate a cryptographically secure private key:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Private keys are 256-bit random numbers</li>
            <li>Never share your private key with anyone</li>
            <li>This is for educational purposes only</li>
          </ul>
        </div>

        <button
          onClick={handleGenerateKey}
          className="w-full bg-hot-pink-500 hover:bg-hot-pink-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 border border-hot-pink-500 hover:border-hot-pink-600 focus:outline-none focus:ring-2 focus:ring-hot-pink-500 focus:ring-offset-2 focus:ring-offset-navy-800"
        >
          Generate Random Private Key
        </button>

        {privateKey && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-baby-pink-500">
              Generated Private Key:
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-navy-700 p-4 rounded-lg border border-navy-600 font-mono text-sm break-all text-baby-blue-300">
                {privateKey}
              </div>
              <button
                onClick={copyToClipboard}
                className="bg-baby-blue-500 hover:bg-baby-blue-600 text-white px-4 py-4 rounded-md transition-colors duration-200 border border-baby-blue-500 hover:border-baby-blue-600 focus:outline-none focus:ring-2 focus:ring-baby-blue-500 focus:ring-offset-2 focus:ring-offset-navy-800"
                title="Copy to clipboard"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-baby-blue-400">
              Length: {privateKey.length} characters (including 0x prefix)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}