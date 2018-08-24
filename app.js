const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const web3 = new Web3 ('https://ropsten.infura.io/v3/166476a8c1cc4b4c93f6f81b2c97aeb1');
acc1 = '0xEd2eA1eC72A661738bA78e0a22A6A26f1Fc80040';
acc2 = '0x2641d29ccf9320b213fb15924fae661e39ad18dc';
const private_key_acc1 = 'B70E232C6D668140D0549D2494219757B143F137DC25C3066DAC0F3629FE47AA';
const private_key_acc2 = 'B3B9F8B7DB5D301B1127F1D1B4BF29B38F0B4BC28948782542B7CE2B10893505';
 const privateKeyBuffer1 = Buffer.from(private_key_acc1, 'hex');
 const privateKeyBuffer2 = Buffer.from(private_key_acc2, 'hex');
 web3.eth.getTransactionCount(acc1, (err, txCount) => {
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       acc2,
    value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }
  const tx = new Tx(txObject)
  tx.sign(private_key_acc1)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash:', txHash)
  })
})
