import Web3 from 'web3';

const web3 = new Web3(process.env.BLOCKCHAIN_RPC_URL);

export const sendTransaction = async (sender, receiver, amount) => {
  try {
    if (!web3.utils.isAddress(sender) || !web3.utils.isAddress(receiver)) {
      throw new Error('Invalid sender or receiver address');
    }

    const transaction = await web3.eth.sendTransaction({
      from: sender,
      to: receiver,
      value: web3.utils.toWei(amount.toString(), 'ether'),
    });

    return { success: true, transaction };
  } catch (error) {
    console.error('Blockchain transaction failed:', error.message || error);
    return { success: false, error: error.message || error };
  }
};
