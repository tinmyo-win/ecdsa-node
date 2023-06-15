const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const { recoverKey } = require('./recoverKey')

app.use(cors());
app.use(express.json());

const balances = {
  "03c93442dbb664c776ba9f009f88f5e73222ebfcb771b60e1db55fd6380b4720e8": 100,
  "039d504b4e0b16ad9852b8f3a98adc151c91a586af426921b85580f9125d64f315": 50,
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
