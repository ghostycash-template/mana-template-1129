import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && window.ethereum) {
  // Modern dapp browsers...
  web3 = new Web3(window.ethereum);
} else if (typeof window !== "undefined" && window.web3) {
  // Legacy dapp browsers...
  web3 = new Web3(window.web3.currentProvider);
} else {
  // Non-Ethereum browser detected
  console.warn(
    "Non-Ethereum browser detected. You should consider trying MetaMask!"
  );

  // Create a fallback Web3 instance that won't throw errors
  web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"
    )
  ); // Replace with your Infura project ID or another provider
}

export default web3;

/*


import Web3 from "web3";

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  // Don't request accounts here, wait for the connect button
} else if (window.web3) {
  // Legacy dapp browsers...
  web3 = new Web3(window.web3.currentProvider);
} else {
  console.error(
    "Non-Ethereum browser detected. You should consider trying MetaMask!"
  );
}

export default web3;


*/
