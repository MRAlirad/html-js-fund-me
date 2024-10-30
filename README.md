# HTML / Javascript Fund Me (Full Stack / Front End)

## Connecting HTML to Metamask

[`metamask`](https://docs.metamask.io/wallet/) has many methods that can help you intract with walltets, network, ...

to access a user's account and connect html to your meta mask you can use [`eth_requestAccounts`](https://docs.metamask.io/wallet/how-to/access-accounts/) method.

```js
await ethereum.request({ method: 'eth_requestAccounts' });
```
