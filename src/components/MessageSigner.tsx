import { useState } from 'react';
import { signMessage, createEthereumTransaction } from '../utils/crypto';

interface MessageSignerProps {
  privateKey: string;
}

export default function MessageSigner({ privateKey }: MessageSignerProps) {
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [messageType, setMessageType] = useState<'custom' | 'ethereum'>('custom');
  const [ethereumTx, setEthereumTx] = useState({
    to: '0x742d35Cc6634C0532925a3b8D',
    value: '0.1',
    nonce: 0,
    gasLimit: '21000',
    gasPrice: '20'
  });

  const handleSignMessage = () => {
    if (!privateKey || !message) return;
    
    try {
      const sig = signMessage(message, privateKey);
      setSignature(sig);
    } catch (error) {
      console.error('Signing failed:', error);
      setSignature('Error: Failed to sign message');
    }
  };

  const handleCreateEthereumTx = () => {
    const txMessage = createEthereumTransaction(
      ethereumTx.to,
      ethereumTx.value,
      ethereumTx.nonce,
      ethereumTx.gasLimit,
      ethereumTx.gasPrice
    );
    setMessage(txMessage);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-navy-800 rounded-lg shadow-lg p-8 border border-navy-700">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-baby-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">4</span>
        </div>
        <h2 className="text-2xl font-bold text-white">Sign Message</h2>
      </div>

      {!privateKey ? (
        <div className="text-center py-8 text-baby-blue-400">
          <p>Generate a private key first to sign messages</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-sm text-baby-blue-300 mb-4">
            <p>Sign messages using your private key:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Custom messages can be any text you want to sign</li>
              <li>Ethereum transactions follow a specific format</li>
              <li>Signatures prove ownership of the private key</li>
            </ul>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMessageType('custom')}
              className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 border ${
                messageType === 'custom'
                  ? 'bg-baby-blue-500 text-white border-baby-blue-500'
                  : 'bg-navy-700 text-baby-blue-300 hover:bg-navy-600 border-navy-600'
              }`}
            >
              Custom Message
            </button>
            <button
              onClick={() => setMessageType('ethereum')}
              className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 border ${
                messageType === 'ethereum'
                  ? 'bg-baby-blue-500 text-white border-baby-blue-500'
                  : 'bg-navy-700 text-baby-blue-300 hover:bg-navy-600 border-navy-600'
              }`}
            >
              Ethereum Transaction
            </button>
          </div>

          {messageType === 'custom' ? (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-baby-pink-500">
                Message to Sign:
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 bg-navy-700 border border-navy-600 rounded-lg focus:ring-2 focus:ring-baby-blue-500 focus:border-transparent text-baby-blue-300 placeholder-baby-blue-400"
                rows={4}
                placeholder="Enter your message here..."
              />
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-baby-pink-500">
                Ethereum Transaction Details:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-baby-blue-400">To Address:</label>
                  <input
                    type="text"
                    value={ethereumTx.to}
                    onChange={(e) => setEthereumTx({...ethereumTx, to: e.target.value})}
                    className="w-full p-2 bg-navy-700 border border-navy-600 rounded-lg focus:ring-2 focus:ring-baby-blue-500 focus:border-transparent text-sm text-baby-blue-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-baby-blue-400">Value (ETH):</label>
                  <input
                    type="text"
                    value={ethereumTx.value}
                    onChange={(e) => setEthereumTx({...ethereumTx, value: e.target.value})}
                    className="w-full p-2 bg-navy-700 border border-navy-600 rounded-lg focus:ring-2 focus:ring-baby-blue-500 focus:border-transparent text-sm text-baby-blue-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-baby-blue-400">Nonce:</label>
                  <input
                    type="number"
                    value={ethereumTx.nonce}
                    onChange={(e) => setEthereumTx({...ethereumTx, nonce: parseInt(e.target.value)})}
                    className="w-full p-2 bg-navy-700 border border-navy-600 rounded-lg focus:ring-2 focus:ring-baby-blue-500 focus:border-transparent text-sm text-baby-blue-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-baby-blue-400">Gas Limit:</label>
                  <input
                    type="text"
                    value={ethereumTx.gasLimit}
                    onChange={(e) => setEthereumTx({...ethereumTx, gasLimit: e.target.value})}
                    className="w-full p-2 bg-navy-700 border border-navy-600 rounded-lg focus:ring-2 focus:ring-baby-blue-500 focus:border-transparent text-sm text-baby-blue-300"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-baby-blue-400">Gas Price (Gwei):</label>
                  <input
                    type="text"
                    value={ethereumTx.gasPrice}
                    onChange={(e) => setEthereumTx({...ethereumTx, gasPrice: e.target.value})}
                    className="w-full p-2 bg-navy-700 border border-navy-600 rounded-lg focus:ring-2 focus:ring-baby-blue-500 focus:border-transparent text-sm text-baby-blue-300"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleCreateEthereumTx}
                  className="bg-baby-blue-500 hover:bg-baby-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 border border-baby-blue-500 hover:border-baby-blue-600 focus:outline-none focus:ring-2 focus:ring-baby-blue-500 focus:ring-offset-2 focus:ring-offset-navy-800 text-sm"
                >
                  Generate Transaction Message
                </button>
              </div>
              {message && (
                <div>
                  <label className="block text-xs font-medium text-baby-blue-400 mb-1">Generated Message:</label>
                  <div className="flex items-start gap-3">
                    <pre className="flex-1 bg-navy-700 p-4 rounded-lg text-xs overflow-x-auto border border-navy-600 text-baby-blue-300">
                      {message}
                    </pre>
                    <button
                      onClick={() => copyToClipboard(message)}
                      className="bg-baby-blue-500 hover:bg-baby-blue-600 text-white px-4 py-4 rounded-md transition-colors duration-200 border border-baby-blue-500 hover:border-baby-blue-600 focus:outline-none focus:ring-2 focus:ring-baby-blue-500 focus:ring-offset-2 focus:ring-offset-navy-800 flex-shrink-0"
                      title="Copy message to clipboard"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleSignMessage}
            disabled={!message}
            className="w-full bg-hot-pink-500 hover:bg-hot-pink-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 border border-hot-pink-500 hover:border-hot-pink-600 focus:outline-none focus:ring-2 focus:ring-hot-pink-500 focus:ring-offset-2 focus:ring-offset-navy-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-hot-pink-500 disabled:hover:border-hot-pink-500"
          >
            Sign Message
          </button>

          {signature && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-baby-pink-500">
                Signature:
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-navy-700 p-4 rounded-lg border border-navy-600 font-mono text-sm break-all text-baby-blue-300">
                  {signature}
                </div>
                <button
                  onClick={() => copyToClipboard(signature)}
                  className="bg-baby-blue-500 hover:bg-baby-blue-600 text-white px-4 py-4 rounded-md transition-colors duration-200 border border-baby-blue-500 hover:border-baby-blue-600 focus:outline-none focus:ring-2 focus:ring-baby-blue-500 focus:ring-offset-2 focus:ring-offset-navy-800"
                  title="Copy to clipboard"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-baby-blue-400">
                Length: {signature.length} characters
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}