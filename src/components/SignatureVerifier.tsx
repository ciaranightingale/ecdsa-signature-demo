import { useState } from 'react';
import { verifySignature } from '../utils/crypto';

interface SignatureVerifierProps {
  publicKeys: { id: string; key: string; compressed: boolean }[];
}

export default function SignatureVerifier({ publicKeys }: SignatureVerifierProps) {
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [selectedPublicKey, setSelectedPublicKey] = useState('');
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    if (!message || !signature || !selectedPublicKey) return;
    
    setIsVerifying(true);
    try {
      const result = verifySignature(message, signature, selectedPublicKey);
      setVerificationResult(result);
    } catch (error) {
      console.error('Verification failed:', error);
      setVerificationResult(false);
    } finally {
      setIsVerifying(false);
    }
  };

  const resetVerification = () => {
    setMessage('');
    setSignature('');
    setSelectedPublicKey('');
    setVerificationResult(null);
  };

  const getPublicKeyLabel = (key: { id: string; key: string; compressed: boolean }) => {
    const preview = key.key.substring(0, 20) + '...';
    return `Public Key: ${preview}`;
  };

  return (
    <div className="bg-navy-800 rounded-lg shadow-lg p-8 border border-navy-700">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-hot-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">5</span>
        </div>
        <h2 className="text-2xl font-bold text-white">Verify Signature</h2>
      </div>

      <div className="space-y-6">
        <div className="text-sm text-baby-blue-300 mb-4">
          <p>Verify signatures using the original message and public key:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Enter the exact message that was signed</li>
            <li>Provide the signature to verify</li>
            <li>Select the corresponding public key</li>
          </ul>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-baby-pink-500">
            Original Message:
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-4 bg-navy-700 border border-navy-600 rounded-lg focus:ring-2 focus:ring-hot-pink-500 focus:border-transparent text-baby-blue-300 placeholder-baby-blue-400"
            rows={4}
            placeholder="Enter the original message that was signed..."
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-baby-pink-500">
            Signature:
          </label>
          <input
            type="text"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            className="w-full p-4 bg-navy-700 border border-navy-600 rounded-lg focus:ring-2 focus:ring-hot-pink-500 focus:border-transparent font-mono text-sm text-baby-blue-300 placeholder-baby-blue-400"
            placeholder="Enter the signature to verify..."
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-baby-pink-500">
            Public Key for Verification:
          </label>
          {publicKeys.length > 0 ? (
            <select
              value={selectedPublicKey}
              onChange={(e) => setSelectedPublicKey(e.target.value)}
              className="w-full p-4 bg-navy-700 border border-navy-600 rounded-lg focus:ring-2 focus:ring-hot-pink-500 focus:border-transparent text-baby-blue-300"
            >
              <option value="">Select a public key...</option>
              {publicKeys.map((key) => (
                <option key={key.id} value={key.key}>
                  {getPublicKeyLabel(key)}
                </option>
              ))}
            </select>
          ) : (
            <div className="text-baby-blue-400 text-sm bg-navy-700 p-4 rounded-lg">
              No public key available. Generate a public key first.
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleVerify}
            disabled={!message || !signature || !selectedPublicKey || isVerifying}
            className="flex-1 bg-hot-pink-500 hover:bg-hot-pink-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 border border-hot-pink-500 hover:border-hot-pink-600 focus:outline-none focus:ring-2 focus:ring-hot-pink-500 focus:ring-offset-2 focus:ring-offset-navy-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-hot-pink-500 disabled:hover:border-hot-pink-500"
          >
            {isVerifying ? 'Verifying...' : 'Verify Signature'}
          </button>
          <button
            onClick={resetVerification}
            className="bg-navy-700 hover:bg-navy-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 border border-navy-600 hover:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2 focus:ring-offset-navy-800"
          >
            Reset
          </button>
        </div>

        {verificationResult !== null && (
          <div className={`p-4 rounded-lg border-2 ${
            verificationResult 
              ? 'bg-green-900/20 border-green-500/50 text-green-300' 
              : 'bg-red-900/20 border-red-500/50 text-red-300'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                verificationResult ? 'bg-green-500' : 'bg-red-500'
              }`}>
                <span className="text-white font-bold">
                  {verificationResult ? '✓' : '✗'}
                </span>
              </div>
              <div>
                <p className={`font-bold text-lg ${
                  verificationResult ? 'text-green-400' : 'text-red-400'
                }`}>
                  {verificationResult ? 'Signature Valid!' : 'Signature Invalid!'}
                </p>
                <p className="text-sm">
                  {verificationResult 
                    ? 'The signature was created by the holder of the corresponding private key.' 
                    : 'The signature does not match the message and public key combination.'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-navy-700 p-4 rounded-lg border border-navy-600">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-baby-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">i</span>
            </div>
            <div className="text-sm text-baby-blue-300">
              <p className="font-medium mb-1 text-baby-pink-500">How signature verification works:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>The message is hashed using SHA-256</li>
                <li>The signature is verified against the hash and public key</li>
                <li>Only the holder of the corresponding private key could have created a valid signature</li>
                <li>This proves authenticity and non-repudiation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}