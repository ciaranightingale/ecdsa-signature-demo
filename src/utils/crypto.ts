import { ethers } from 'ethers';

export function generatePrivateKey(): string {
  const wallet = ethers.Wallet.createRandom();
  return wallet.privateKey;
}

export function getPublicKey(privateKey: string): string {
  const signingKey = new ethers.SigningKey(privateKey);
  return signingKey.publicKey;
}

export function getCompressedPublicKey(privateKey: string): string {
  const signingKey = new ethers.SigningKey(privateKey);
  return ethers.SigningKey.computePublicKey(signingKey.publicKey, true);
}

export function getAddress(publicKey: string): string {
  const address = ethers.computeAddress(publicKey);
  return address;
}

export function getEthereumAddress(publicKey: string): string {
  return ethers.computeAddress(publicKey);
}

export function signMessage(message: string, privateKey: string): string {
  const wallet = new ethers.Wallet(privateKey);
  const messageBytes = ethers.toUtf8Bytes(message);
  const messageHash = ethers.keccak256(messageBytes);
  const signature = wallet.signingKey.sign(messageHash);
  return ethers.Signature.from(signature).serialized;
}

export function verifySignature(message: string, signature: string, publicKey: string): boolean {
  try {
    const messageBytes = ethers.toUtf8Bytes(message);
    const messageHash = ethers.keccak256(messageBytes);
    const recoveredPublicKey = ethers.SigningKey.recoverPublicKey(messageHash, signature);
    return recoveredPublicKey.toLowerCase() === publicKey.toLowerCase();
  } catch {
    return false;
  }
}

export function createEthereumTransaction(to: string, value: string, nonce: number, gasLimit: string, gasPrice: string): string {
  const transaction = {
    to,
    value: value + ' ETH',
    nonce,
    gasLimit,
    gasPrice: gasPrice + ' Gwei'
  };
  
  return JSON.stringify(transaction, null, 2);
}

export function formatKey(key: string, maxLength: number = 20): string {
  if (key.length <= maxLength) return key;
  return key.substring(0, maxLength) + '...';
}

export function isValidPrivateKey(privateKey: string): boolean {
  try {
    const cleaned = privateKey.replace('0x', '');
    if (cleaned.length !== 64) return false;
    new ethers.SigningKey(privateKey);
    return true;
  } catch {
    return false;
  }
}

export function isValidPublicKey(publicKey: string): boolean {
  try {
    const cleaned = publicKey.replace('0x', '');
    if (cleaned.length !== 66 && cleaned.length !== 130) return false;
    ethers.SigningKey.computePublicKey(publicKey);
    return true;
  } catch {
    return false;
  }
}