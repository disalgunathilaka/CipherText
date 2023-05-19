import forge from 'node-forge';

export const encrypt = (input: string, publicKey: string) => {
  const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
  const encrypted = publicKeyObj.encrypt(input);
  return forge.util.encode64(encrypted);
};

// Decrypt the encrypted input using the private key
export const decrypt = (encryptedInput: string, privateKey: string) => {
  try {
    const privateKeyObj = forge.pki.privateKeyFromPem(privateKey);
    const encrypted = forge.util.decode64(encryptedInput);
    const decrypted = privateKeyObj.decrypt(encrypted);
    return decrypted;
  } catch (err) {
    return 'enable to decrypt ';
  }
};
