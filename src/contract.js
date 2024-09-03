const express = require('express');
const Web3 = require('web3');
const app = express();
app.use(express.json());

const web3 = new Web3('https://your-ethereum-node-url'); // e.g., Infura or Alchemy URL
const contractABI = [/* ABI array from your compiled contract */];
const contractAddress = 'your_contract_address'; // Deployed contract address
const contract = new web3.eth.Contract(contractABI, contractAddress);
const adminPrivateKey = 'your_private_key'; // Admin's private key for signing transactions

// Helper function to send transactions
async function sendTransaction(method, fromAddress) {
  const gas = await method.estimateGas({ from: fromAddress });
  const data = method.encodeABI();
  const tx = {
    to: contractAddress,
    data: data,
    gas: gas,
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, adminPrivateKey);
  return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
}

// 1. addTask API
app.post('/api/addTask', async (req, res) => {
  const { time, expertise, dependencies, wage, deadline, divisible } = req.body;
  const fromAddress = web3.eth.accounts.privateKeyToAccount(adminPrivateKey).address;

  try {
    const method = contract.methods.addTask(
      web3.utils.randomHex(32), // Generating a random task ID
      time,
      expertise,
      dependencies,
      wage,
      deadline,
      divisible
    );
    const receipt = await sendTransaction(method, fromAddress);
    res.status(200).json({ success: true, receipt });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. addWorker API
app.post('/api/addWorker', async (req, res) => {
  const { hours, expertise, min_wage, wallet } = req.body;
  const fromAddress = wallet; // Worker registers using their wallet address

  try {
    const method = contract.methods.registerWorker(hours, expertise, min_wage);
    const receipt = await sendTransaction(method, fromAddress);
    res.status(200).json({ success: true, receipt });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. checkStatus API
app.get('/api/checkStatus', async (req, res) => {
  try {
    const status = await contract.methods.checkStatus().call();
    res.status(200).json({ success: true, tasks: status });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. checkWallet API
app.post('/api/checkWallet', async (req, res) => {
  const { worker_id } = req.body;
  try {
    const balance = await contract.methods.checkWallet(worker_id).call();
    res.status(200).json({ success: true, balance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
