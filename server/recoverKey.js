const { secp256k1 } = require("ethereum-cryptography/secp256k1")
const { keccak256 } = require('ethereum-cryptography/keccak');
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

function recoverKey(signatureHash, amount) {
    const amountHash = utf8ToBytes(amount.toString());
    const msgHash = toHex(keccak256(amountHash));

    const signature = secp256k1.Signature.fromCompact(signatureHash).addRecoveryBit(0);

    return signature.recoverPublicKey(msgHash).toHex();
}

module.exports = {
    recoverKey
}
