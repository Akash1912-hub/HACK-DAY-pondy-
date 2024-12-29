import Web3 from 'web3';

export async function initializeWeb3(): Promise<Web3> {
  const web3 = new Web3("http://127.0.0.1:8545");
  return web3;
}

export async function getNodeInfo(web3: Web3): Promise<string> {
  try {
    return await web3.eth.getNodeInfo();
  } catch (error) {
    throw new Error(`Failed to get node info: ${error}`);
  }
}

export async function createNewWallet(web3: Web3) {
  try {
    return web3.eth.accounts.create();
  } catch (error) {
    throw new Error(`Failed to create wallet: ${error}`);
  }
}

export async function getWalletBalance(web3: Web3, address: string): Promise<string> {
  try {
    const balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance, "ether");
  } catch (error) {
    throw new Error(`Failed to get balance: ${error}`);
  }
}

export async function sendTransaction(
  web3: Web3,
  account: any,
  recipient: string,
  amount: string
) {
  try {
    const tx = {
      from: account.address,
      to: recipient,
      value: web3.utils.toWei(amount, "ether"),
      gas: 21000,
    };

    const signedTx = await account.signTransaction(tx);
    return await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  } catch (error) {
    throw new Error(`Failed to send transaction: ${error}`);
  }
}