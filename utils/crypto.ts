import forge from 'node-forge';

// const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
// const privateKeyObj = forge.pki.privateKeyFromPem(privateKey);

export const encrypt = (
  input: string,
  publicKeyObj: forge.pki.rsa.PublicKey,
) => {
  const encrypted = publicKeyObj.encrypt(input);
  return forge.util.encode64(encrypted);
};

export const decrypt = (
  encryptedInput: string,
  privateKeyObj: forge.pki.rsa.PrivateKey,
) => {
  try {
    const encrypted = forge.util.decode64(encryptedInput);
    const decrypted = privateKeyObj.decrypt(encrypted);
    return decrypted;
  } catch (err) {
    return 'unable to decrypt';
  }
};
