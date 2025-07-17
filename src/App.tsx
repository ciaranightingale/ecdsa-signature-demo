import { useState } from 'react';
import PrivateKeyGenerator from './components/PrivateKeyGenerator';
import PublicKeyDerivation from './components/PublicKeyDerivation';
import AddressGenerator from './components/AddressGenerator';
import MessageSigner from './components/MessageSigner';
import SignatureVerifier from './components/SignatureVerifier';
import Footer from './components/Footer';

interface PublicKey {
  id: string;
  key: string;
  compressed: boolean;
}

function App() {
  const [privateKey, setPrivateKey] = useState<string>('');
  const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);

  const handlePrivateKeyGenerated = (key: string) => {
    setPrivateKey(key);
  };

  const handlePublicKeysChange = (keys: PublicKey[]) => {
    setPublicKeys(keys);
  };

  return (
    <div className="min-h-screen bg-navy-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ECDSA Signature Demo
          </h1>
          <p className="text-lg text-baby-blue-300 max-w-2xl mx-auto">
            Learn about Elliptic Curve Digital Signature Algorithm (ECDSA) through interactive demonstrations. 
            Generate keys, create signatures, and verify them step by step.
          </p>
        </header>

        <div className="space-y-8">
          <PrivateKeyGenerator onPrivateKeyGenerated={handlePrivateKeyGenerated} />
          
          <PublicKeyDerivation 
            privateKey={privateKey} 
            onPublicKeysChange={handlePublicKeysChange} 
          />
          
          <AddressGenerator publicKeys={publicKeys} />
          
          <MessageSigner privateKey={privateKey} />
          
          <SignatureVerifier publicKeys={publicKeys} />
        </div>

        <div className="mt-16 bg-navy-800 rounded-lg shadow-lg p-6 border border-navy-700">
          <h2 className="text-2xl font-bold text-white mb-4">About ECDSA</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-baby-blue-300">
            <div>
              <h3 className="font-semibold text-baby-pink-500 mb-2">What is ECDSA?</h3>
              <p>
                ECDSA (Elliptic Curve Digital Signature Algorithm) is a cryptographic algorithm 
                used to create digital signatures. It's based on elliptic curve mathematics and 
                provides the same security as RSA with smaller key sizes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-baby-pink-500 mb-2">How it works:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Private key: Random 256-bit number</li>
                <li>Public key: Derived from private key using elliptic curve multiplication</li>
                <li>Signature: Mathematical proof that you own the private key</li>
                <li>Verification: Anyone can verify the signature using the public key</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;