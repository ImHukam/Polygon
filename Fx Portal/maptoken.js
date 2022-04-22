const hre = require("hardhat");
const { ethers } = require("ethers");

// rootchain = goerli eth testnet
// childchain = mumbai polygon testnet

// connect provider to interact with eth and polygon chain
const eth_provider = new ethers.providers.JsonRpcProvider("rpc url");
const matic_provider = new ethers.providers.JsonRpcProvider("rpc url");

// interface abi for root and child chain
const roottunnel_abi = [
  "function deposit(address rootToken, address user, uint256 amount, bytes memory data) public",
  "function mapToken(address rootToken) public",
  "function receiveMessage(bytes memory inputData) public virtual",
];
const childtunnel_abi = [
  "function withdraw(address childToken, uint256 amount) public",
];

// root token abi
const token_abi = [
  "function approve(address,uint256) external returns (bool)"
]

// contract address for roottunnel , childtunnel and root token
const roottunnel_address = "0x3658ccFDE5e9629b0805EB06AaCFc42416850961";
const childtunnel_address = "0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767";
const token_address = "0x0E9d93a7F5f847ED46e533eBB5b7c02aBaDe818B";

// get contract for roottunnel , childtunnel and root token
const roottunnelContract = new ethers.Contract(roottunnel_address, roottunnel_abi, eth_provider);
const childtunnelContract = new ethers.Contract(childtunnel_address, childtunnel_abi, matic_provider);
const tokenContract = new ethers.Contract(token_address, token_abi, eth_provider);

const privateKey = "private key"; // only for testing purpose, use env for real development

// wallet integration
const eth_wallet = new ethers.Wallet(privateKey, eth_provider);
const matic_wallet = new ethers.Wallet(privateKey, matic_provider);

// connect wallet to contract
const roottunnelContractWithWallet = roottunnelContract.connect(eth_wallet);
const childtunnelContractWithWallet = childtunnelContract.connect(matic_wallet);
const tokenContractWtihWallet = tokenContract.connect(eth_wallet);



async function main() {

  // if we use first time, after one time mapping, no need to call maptoken funcion
  await roottunnelContractWithWallet.mapToken("0x4d1f8B21F8EB8F3821D50AcCa57D30d7e237325b");
  console.log("token mapped");

  // approve rootToken to make deposit on roottunnel
  amount = ethers.utils.parseEther('30')
  await tokenContractWtihWallet.approve('0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3', amount);
  console.log("token approved");

  // to deposit rootoken into roottunnel, after few minutes,polygon chain token will be received into receiver address
  await roottunnelContractWithWallet.deposit(
    "0x0E9d93a7F5f847ED46e533eBB5b7c02aBaDe818B",
    "0xC980bBe81d7AE0CcbF72B6AbD59534dd8d176c77",
    amount,
    "0x00"
  );
  console.log("root token deposited");

  // to withdraw childtoken into rootchain
  const tx = await childtunnelContractWithWallet.withdraw("0xB097791018EA1484Bb92D4518A95AE9fa38b4D61", ethers.utils.parseEther('1'));
  console.log("fx token withdraw");
  await tx.wait();
  const txhash = tx.hash;
  console.log("burn hash: ", txhash);

  // note tx hash and after checkpointed,generate proof using burn proof scripts
  // will get burn proof using burn tx hash,sent this proof to roottunnel using receiveMessage function
  const inputdata = ""; // burn proof
  await roottunnelContractWithWallet.receiveMessage(inputdata);
  console.log("withdraw exit");

  // will get token into rootchain(eth)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


