# ECDSA Signature Demo

A React + TypeScript + Vite application that demonstrates ECDSA (Elliptic Curve Digital Signature Algorithm) signatures using the secp256k1 curve. This educational tool helps users understand cryptographic concepts through interactive visualizations.

## Features

- **Private Key Generation**: Create random private keys with security warnings
- **Public Key Derivation**: Generate public keys from private keys with add/remove functionality
- **Address Generation**: Create public addresses from public keys
- **Message Signing**: Sign custom messages or Ethereum-style transactions
- **Signature Verification**: Verify signatures using public keys/addresses
- **Beautiful UI**: Navy blue theme with hot pink, baby pink, baby blue, and lime green accents

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS with custom theme
- **Cryptography**: secp256k1, ethers.js
- **Build Tool**: Vite

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── PrivateKeyGenerator.tsx
│   ├── PublicKeyDerivation.tsx
│   ├── AddressGenerator.tsx
│   ├── MessageSigner.tsx
│   ├── SignatureVerifier.tsx
│   └── Footer.tsx
├── utils/
│   └── crypto.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Security Notice

⚠️ **Important**: This is an educational demo. Never use generated private keys for real cryptocurrency transactions. Always use proper key management practices in production environments.

## Credits

- Created by [Cyfrin](https://cyfrin.io/)
- Inspired by [BLS Lab](https://blslab.xyz/)
- Built with React + TypeScript + Vite

## License

MIT