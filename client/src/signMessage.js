import * as secp from '@noble/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak'
import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils'

async function signMessage(amount, privKey) {

    const amountHash = utf8ToBytes(amount);
    const msgHash = toHex(keccak256(amountHash));
    // console.log(msgHash);
    const pubKey1 = secp.getPublicKey(privKey); // Make pubkey from the private key
    console.log(toHex(pubKey1));
    const signature = (await secp.signAsync(msgHash, privKey)).toCompactHex(); // sign
    // const isValid = secp.verify(signature, msgHash, pubKey); // verify

    // const pubKey2 = getPublicKey(secp.utils.randomPrivateKey()); // Key of user 2

    // const pubKey = signature.recoverPublicKey(msgHash); // Public key recovery

    // console.log(pubKey.toHex());
    console.log(signature)

    return signature;
}

export default signMessage;