import Web3 from "web3";

export const getWeb3Instance = () => {
  if (window.ethereum) {
    try {
      window.ethereum.request({ method: "eth_requestAccounts" });

      return new Web3(window.ethereum);
    } catch (error) {
      console.error("User denied account access", error);
      return null;
    }
  } else {
    console.error(
      "MetaMask is not installed. Please install MetaMask to use this app."
    );
    return null;
  }
};

export const getContractInstance = (web3, contractAddress, abi) => {
  if (web3) {
    try {
      return new web3.eth.Contract(abi, contractAddress);
    } catch (error) {
      console.error("Failed to create contract instance", error);
      return null;
    }
  } else {
    console.error("Web3 instance is not available");
    return null;
  }
};

export const connectMetaMask = async () => {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return {
      status: "success",
      account: accounts[0],
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message || "Failed to connect to MetaMask",
    };
  }
};

export const getAccountBalance = async (account) => {
  const web3 = getWeb3Instance();
  const balance = await web3.eth.getBalance(account);
  return web3.utils.fromWei(balance, "ether");
};
