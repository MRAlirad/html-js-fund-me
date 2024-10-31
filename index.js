import { ethers, parseEther } from 'https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js';
import { contractAddress, abi } from './constances.js';

const connectBtn = document.querySelector('#connectButton');
const fundBtn = document.querySelector('#fundButton');

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
	const ethAmount = '0.1';
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
		console.log(transactionResponse);
	} catch (error) {
		alert(error.message);
	}
	// console.log(transactionResponse);
};

connectBtn.addEventListener('click', connect);
fundBtn.addEventListener('click', fund);
