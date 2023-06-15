import * as secp from '@noble/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak'
import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils'

async function signMessage(amount, privKey) {

    const amountHash = utf8ToBytes(amount);
    const msgHash = toHex(keccak256(amountHash));
    const signature = (await secp.signAsync(msgHash, privKey)).addRecoveryBit(0).toCompactHex(); // sign

    return signature;
}

export default signMessage;