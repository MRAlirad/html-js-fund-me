import { ethers } from './ethers-6.7.esm.min.js';
import { contractAddress, abi } from './constances.js';

const connectBtn = document.querySelector('#connectButton');
const fundBtn = document.querySelector('#fundButton');
const withdrawBtn = document.querySelector('#withdrawButton');
const balanceBtn = document.querySelector('#balanceButton');
const ethAmountInput = document.querySelector('#ethAmount');

const connect = async () => {
	if (!window.ethereum) {
		connectBtn.innerHTML = 'Please install metamask';
		return;
	}
	try {
		await ethereum.request({ method: 'eth_requestAccounts' });
	} catch (error) {
		console.error(error);
	}

	connectBtn.innerHTML = 'Connected';

	const accounts = await ethereum.request({ method: 'eth_accounts' });
	console.log(accounts);
};

const fund = async () => {
	const ethAmount = ethAmountInput.value;

	if (!window.ethereum) {
		balanceBtn.innerHTML = 'Please install MetaMask';
		return;
	}

	// connection to the blockchain
	// singner / wallet / someone with some gas
	// contract that we are interacting wigh
	// ABI & Address

	const provider = new ethers.BrowserProvider(window.ethereum);
	await provider.send('eth_requestAccounts', []);
	const signer = await provider.getSigner();
	const contract = new ethers.Contract(contractAddress, abi, signer); // A contract instance

	try {
		const transactionResponse = await contract.fund({
			value: ethers.parseEther(ethAmount),
		});
		await transactionResponse.wait(1);
	} catch (error) {
		console.error(error);
	}
};

const withdraw = async () => {
	if (!window.ethereum) {
		balanceBtn.innerHTML = 'Please install MetaMask';
		return;
	}

	console.log(`Withdrawing...`);

	const provider = new ethers.BrowserProvider(window.ethereum);
	await provider.send('eth_requestAccounts', []);
	const signer = await provider.getSigner();
	const contract = new ethers.Contract(contractAddress, abi, signer);
	try {
		console.log('Processing transaction...');
		const transactionResponse = await contract.withdraw();
		await transactionResponse.wait(1);
		console.log('Done!');
	} catch (error) {
		console.error(error);
	}
};

const getBalance = async () => {
	if (!window.ethereum) {
		balanceBtn.innerHTML = 'Please install MetaMask';
		return;
	}

	const provider = new ethers.BrowserProvider(window.ethereum);
	try {
		const balance = await provider.getBalance(contractAddress);
		console.log(ethers.formatEther(balance));
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
withdrawBtn.addEventListener('click', withdraw);
balanceBtn.addEventListener('click', getBalance);
