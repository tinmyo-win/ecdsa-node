const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const { recoverKey } = require('./recoverKey')

app.use(cors());
app.use(express.json());

const balances = {
  "028ea3d57eb9b626080612a812e602f4567259ec142a0772c822cdbcd5271b0032": 100,
  "024f307ae09806ebc1694502ce651bd95a4a52767a8a4ab21d6bea350f7bf2c6b4": 50,
  "0363d0041ca9bf243cb010b6efd1e173baaf0e08ddf28319cc04bf14c19e90d7b6": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {

  //get the signature from the client side
  //recover the public key from the signatue

  const { signature, recipient, amount } = req.body;

  let sender = recoverKey(signature, amount);
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
