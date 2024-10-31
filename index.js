import { ethers, parseEther,formatEther } from 'https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js';
import { contractAddress, abi } from './constances.js';

const connectBtn = document.querySelector('#connectButton');
const fundBtn = document.querySelector('#fundButton');
const balanceBtn = document.querySelector('#balanceButton');
const ethAmountInput = document.querySelector('#ethAmount');

const connect = async () => {
	if (window.ethereum) {
		try {
			await ethereum.request({ method: 'eth_requestAccounts' });
		} catch (error) {
			console.log(error);
		}

		connectBtn.innerHTML = 'Connected';
	} else {
		connectBtn.innerHTML = 'Please install metamask';
	}
};

const fund = async () => {
	const ethAmount = ethAmountInput.value;

	if (!window.ethereum) return;

	// connection to the blockchain
	// singner / wallet / someone with some gas
	// contract that we are interacting wigh
	// ABI & Address

	const provider = new ethers.BrowserProvider(window.ethereum);
	const signer = await provider.getSigner();
	const contract = new ethers.Contract(contractAddress, abi, signer); // A contract instance
	try {
		const transactionResponse = await contract.fund({ value: parseEther(ethAmount) });
		await listenForTransactionMine(transactionResponse, provider);
		// listen for tx to be
		// listen for an event
	} catch (error) {
		alert(error.message);
	}
	// console.log(transactionResponse);
};

const getBalance = async () => {
	if (!window.ethereum) {
		balanceBtn.innerHTML = 'Please install MetaMask';
		return;
	}

	const provider = new ethers.BrowserProvider(window.ethereum);
	try {
		const balance = await provider.getBalance(contractAddress);
		console.log(formatEther(balance));
	} catch (error) {
		console.log(error);
	}
};

const listenForTransactionMine = (transactionResponse, provider) => {
	console.log(`Mining ${transactionResponse.hash}`);
	//! listen for this transaction to finish
	return new Promise((resolve, reject) => {
		try {
			//triggers only once
			provider.once(transactionResponse.hash, async transactionReceipt => {
				console.log(`Completed with ${await transactionReceipt.confirmations()} confirmations. `); //! Resolves to the number of confirmations this transaction has
				resolve();
			});
		} catch (error) {
			reject(error);
		}
	});
};

connectBtn.addEventListener('click', connect);
fundBtn.addEventListener('click', fund);
balanceBtn.addEventListener('click', getBalance);
