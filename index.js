const connectBtn = document.querySelector('#connectButton');

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

connectBtn.addEventListener('click', connect);
