import express, { json } from 'express';
import Web3 from 'web3';
const app = express();
app.use(json());

const web3 = new Web3('https://your-ethereum-node-url'); // e.g., Infura or Alchemy URL
const contractABI = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"type":"constructor","stateMutability":"nonpayable"},{"name":"Approval","inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"type":"event"},{"name":"Paused","inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"type":"event"},{"name":"RoleAdminChanged","inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"type":"event"},{"name":"RoleGranted","inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"type":"event"},{"name":"RoleRevoked","inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"type":"event"},{"name":"Transfer","inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"type":"event"},{"name":"Unpaused","inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"type":"event"},{"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"type":"function","stateMutability":"view"},{"name":"MINTER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"type":"function","stateMutability":"view"},{"name":"PAUSER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"type":"function","stateMutability":"view"},{"name":"allowance","inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"type":"function","stateMutability":"view"},{"name":"approve","inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"outputs":[{"internalType":"bool","name":"","type":"bool"}],"type":"function","stateMutability":"nonpayable"},{"name":"balanceOf","inputs":[{"internalType":"address","name":"account","type":"address"}],"outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"type":"function","stateMutability":"view"},{"name":"burn","inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"type":"function","stateMutability":"nonpayable"},{"name":"burnFrom","inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"type":"function","stateMutability":"nonpayable"},{"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"type":"function","stateMutability":"view"},{"name":"decreaseAllowance","inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"outputs":[{"internalType":"bool","name":"","type":"bool"}],"type":"function","stateMutability":"nonpayable"},{"name":"getRoleAdmin","inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"type":"function","stateMutability":"view"},{"name":"getRoleMember","inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"outputs":[{"internalType":"address","name":"","type":"address"}],"type":"function","stateMutability":"view"},{"name":"getRoleMemberCount","inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"type":"function","stateMutability":"view"},{"name":"grantRole","inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"type":"function","stateMutability":"nonpayable"},{"name":"hasRole","inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"outputs":[{"internalType":"bool","name":"","type":"bool"}],"type":"function","stateMutability":"view"},{"name":"increaseAllowance","inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"outputs":[{"internalType":"bool","name":"","type":"bool"}],"type":"function","stateMutability":"nonpayable"},{"name":"mint","inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"type":"function","stateMutability":"nonpayable"},{"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"type":"function","stateMutability":"view"},{"name":"pause","type":"function","stateMutability":"nonpayable"},{"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"type":"function","stateMutability":"view"},{"name":"renounceRole","inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"type":"function","stateMutability":"nonpayable"},{"name":"revokeRole","inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"type":"function","stateMutability":"nonpayable"},{"name":"supportsInterface","inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"outputs":[{"internalType":"bool","name":"","type":"bool"}],"type":"function","stateMutability":"view"},{"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"type":"function","stateMutability":"view"},{"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"type":"function","stateMutability":"view"},{"name":"transfer","inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"outputs":[{"internalType":"bool","name":"","type":"bool"}],"type":"function","stateMutability":"nonpayable"},{"name":"transferFrom","inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"outputs":[{"internalType":"bool","name":"","type":"bool"}],"type":"function","stateMutability":"nonpayable"},{"name":"unpause","type":"function","stateMutability":"nonpayable"}];
const contractAddress = '0x7b4e3857c9a1350366c9727b266e6093604693d8'; // Deployed contract address
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
