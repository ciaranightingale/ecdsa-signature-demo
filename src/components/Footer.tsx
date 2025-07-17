
export default function Footer() {
  return (
    <footer className="bg-navy-800 text-white py-8 mt-12 border-t border-navy-700">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">ECDSA Signature Demo</h3>
            <p className="text-sm text-baby-blue-300">
              Educational tool for understanding elliptic curve digital signatures
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <a
              href="https://cyfrin.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-hot-pink-500 hover:text-hot-pink-300 font-medium transition-colors"
            >
              Created by Cyfrin
            </a>
            <span className="hidden md:inline text-navy-600">|</span>
            <a
              href="https://blslab.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-baby-blue-500 hover:text-baby-blue-300 font-medium transition-colors"
            >
              Inspired by BLS Lab
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-navy-600 text-center text-sm text-baby-blue-400">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <p>
              For educational purposes only. Never use generated keys for real transactions.
            </p>
          </div>
          <p className="mt-2">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}