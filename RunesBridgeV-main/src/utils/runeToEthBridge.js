import web3 from "./web3";
import RuneToEth from "./RuneToEth.json";
// Replace with your deployed contract's address
const contractAddress = "0x2e17Eb489a48D8cC2a15e928F53560528Bee9957";

const runeToEthBridge = new web3.eth.Contract(RuneToEth, contractAddress);

export default runeToEthBridge;
