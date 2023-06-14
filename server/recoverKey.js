const { secp256k1 } = require("ethereum-cryptography/secp256k1")
const { keccak256 } = require('ethereum-cryptography/keccak');
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

function recoverKey(signature, amount) {
    const amountHash = utf8ToBytes(amount.toString());
    const msgHash = toHex(keccak256(amountHash));

    const signa = secp256k1.Signature.fromCompact(signature).addRecoveryBit(1);

    // console.log(signa.recoverPublicKey(msgHash).toHex());
    return signa.recoverPublicKey(msgHash).toHex();
    // console.log(toHex(secp256k1.verify(msgHash, signature)));
    // const pubKey = signature.recoverPublicKey(msgHash); // Public key recovery
    // console.log(msgHash)
}

module.exports = {
    recoverKey
}
