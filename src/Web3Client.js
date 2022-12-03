// import NFTContractBuild from 'contracts/NFT.json';
import Web3 from 'web3/dist/web3.min.js';
let selectedAccount;
let erc20Contract;
let isInitialized = false;

const erc20Abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_basePrice",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "url",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "funded",
				"type": "uint256"
			}
		],
		"name": "gotEther",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "refunded",
				"type": "bool"
			}
		],
		"name": "refunded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "url",
				"type": "string"
			}
		],
		"name": "sendEth",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "url",
				"type": "string"
			}
		],
		"name": "sendEthTest",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "bidPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastBidder",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "URL",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const addr = "0x1269A2AB42049D75059a42B3CAa74b33184A9a48";

export const init = async (needWallet) => {
	// let provider = window.ethereum;
	// if (typeof provider !== 'undefined') {
	// }
	// const web3 = new Web3(provider);
	// const networkId = await web3.eth.net.getId();
	// const web3 = new Web3("https://ropsten.etherscan.io")
	
	const web3 = new Web3('https://ropsten.infura.io/v3/b23a8473dbd64275ae7528954cfc53a9');

	// erc20Contract = web3.eth.contract(erc20Abi).at(addr);
	erc20Contract = new web3.eth.Contract(
		erc20Abi,
		addr
	);
	isInitialized = true;
};

export const updateURLtoBC = async (url, value) => {
  let provider = window.ethereum;

	if (typeof provider !== 'undefined') {
    // if(needWallet){
      provider
			.request({ method: 'eth_requestAccounts' })
			.then((accounts) => {
				selectedAccount = accounts[0];
				console.log(`Selected account is ${selectedAccount}`);
			})
			.catch((err) => {
				console.log(err);
				return;
			});

		window.ethereum.on('accountsChanged', function (accounts) {
			selectedAccount = accounts[0];
			console.log(`Selected account changed to ${selectedAccount}`);
		});
    // }
	
	}

	const web3 = new Web3(provider);

	const networkId = await web3.eth.net.getId();

	erc20Contract = new web3.eth.Contract(
		erc20Abi,
		addr
	);
  	var decimals = 18;
	return erc20Contract.methods
		.sendEth(url)
    .send({
      from: selectedAccount, 
      value: web3.utils.toBN((value*(10**decimals)).toString())
     })
		.then((res) => {
			console.log("Success", res)
      window.location.reload();
		}).catch(err => console.log(err)) ;
};



export const getURL = async () => {
	if (!isInitialized) {
		await init(false);
	}
	return erc20Contract.methods
		.URL()
    .call()
		.then((url) => {
			return url;
		});
};

export const getNextPrice = async () => {
	if (!isInitialized) {
		await init(false);
	}
	return erc20Contract.methods
		.lastPrice()
    .call()
		.then((lp) => {
      lp = Web3.utils.fromWei(lp);
      console.log(lp);
			return lp;
		});
};

// export const mintToken = async () => {
// 	if (!isInitialized) {
// 		await init();
// 	}

// 	return nftContract.methods
// 		.mint(selectedAccount)
// 		.send({ from: selectedAccount });
// };