/*
Generates:
- results/not-airdropped.txt
- results/not-airdropped-accounts.txt
- results/not-airdropped-amounts.txt
- results/not-airdropped-amounts-with-decimals.txt

Does:
- Reads the data/addresses and data/amounts to check if the data/account has more or equal the amount in data/amounts
- Checks that the airdropped accounts have more or equal the amount sent
*/
const Web3 = require('web3')
const fs = require('fs')
const BigNumber = require('bignumber.js')
const { join } = require('path')
const erc20Abi = require('./../erc20.js').abi
const erc20Address = require('./../erc20.js').address
const configuration = require('./../config.js')
const web3 = new Web3(new Web3.providers.HttpProvider(configuration.network));
const ERC20 = new web3.eth.Contract(erc20Abi, erc20Address);
let accounts
let amounts
let fileContent = ''
let fileAccounts = ''
let fileAmounts = ''
let fileAmountsWithDecimals = ''

createArrays()
init()

function createArrays() {
	const rawAddresses = fs.readFileSync(join(__dirname, '../data/addresses'), 'utf-8')
	const rawAmounts = fs.readFileSync(join(__dirname, '../data/amounts'), 'utf-8')
	accounts = rawAddresses.split('\r\n')
	amounts = rawAmounts.split('\r\n')
	console.log('acc', accounts.length)
	console.log('amt', amounts.length)
}

async function init() {
	// To not lose the progress we use a try catch
	try {
		for(let i = 0; i < accounts.length; i++) {
			let realAmount = BN(await ERC20.methods.balanceOf(accounts[i]).call())
			if(realAmount.gt(BN(0))) realAmount = realAmount.div(BN(configuration.decimals))
			let amount = BN(amounts[i])

			console.log(`${i} Processed: ${accounts[i]} airdrop value: ${amount} real value: ${realAmount}`)
			// Write the address if the amount is not airdropped
			if(amount.gt(realAmount)) {
				fileContent += `${i} ${accounts[i]} : ${amount} : ${realAmount} send: ${amount.sub(realAmount)}\r\n`
				fileAccounts += `${accounts[i]}\r\n`
				fileAmounts += `${amount.sub(realAmount)}\r\n`
				fileAmountsWithDecimals += `${amount.sub(realAmount).mul(BN(configuration.decimals))}\r\n`
			}
		}
	} catch(e) {
		console.log('Error', e)
	}

	fs.writeFileSync('results/not-airdropped.txt', fileContent)
	fs.writeFileSync('results/not-airdropped-accounts.txt', fileAccounts)
	fs.writeFileSync('results/not-airdropped-amounts.txt', fileAmounts)
	fs.writeFileSync('results/not-airdropped-amounts-with-decimals.txt', fileAmountsWithDecimals)
}

function BN(number) {
	return new BigNumber(number)
}
