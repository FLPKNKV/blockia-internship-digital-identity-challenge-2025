import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';

export interface KeyPair {
  publicKey: string;
  secretKey: Uint8Array;
}

export function generateKeyPair(): KeyPair {
  const keyPair = nacl.sign.keyPair();
  return {
    publicKey: naclUtil.encodeBase64(keyPair.publicKey),
    secretKey: keyPair.secretKey
  };
}

export function signMessage(message: string, secretKey: Uint8Array): string {
  const messageUint8 = naclUtil.decodeUTF8(message);
  const signature = nacl.sign.detached(messageUint8, secretKey);
  return naclUtil.encodeBase64(signature);
}

export function verifySignature(message: string, signature: string, publicKey: string): boolean {
  const messageUint8 = naclUtil.decodeUTF8(message);
  const signatureUint8 = naclUtil.decodeBase64(signature);
  const publicKeyUint8 = naclUtil.decodeBase64(publicKey);
  return nacl.sign.detached.verify(messageUint8, signatureUint8, publicKeyUint8);
}
