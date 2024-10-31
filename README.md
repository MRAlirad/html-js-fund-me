# HTML / Javascript Fund Me (Full Stack / Front End)

## Connecting HTML to Metamask

[`metamask`](https://docs.metamask.io/wallet/) has many methods that can help you intract with walltets, network, ...

to access a user's account and connect html to your meta mask you can use [`eth_requestAccounts`](https://docs.metamask.io/wallet/how-to/access-accounts/) method.

```js
await ethereum.request({ method: 'eth_requestAccounts' });
```

## Sending a transaction from a Website

This very first thing needed to begin interacting with the blockchain is connecting to it using a [`Provider`](https://docs.ethers.org/v6/single-page/#getting-started__starting-connecting).

-   [`BrowserProvider`](https://docs.ethers.org/v6/single-page/#api_providers__BrowserProvider) => Connect to the MetaMask EIP-1193 object. This is a standard protocol that allows Ethers access to make all read-only requests through MetaMask.

```js
provider = new ethers.BrowserProvider(window.ethereum);
```

-   getSigner => It also provides an opportunity to request access to write operations, which will be performed by the private key that MetaMask manages for the user.

```js
provider = new ethers.BrowserProvider(window.ethereum);
signer = await provider.getSigner();
```

- you can have the contract instance using `ethers.Contract` class and pass the paramethers.

```js
const contract = new ethers.Contract(contractAddress, abi, signer);
```

you need to connect to a hardhat network in order to fund some amount. so you can add a hardhat network to your metamask.

we can import a hardhat `private key` in our metamask to import the hardhat wallet to our metamask.