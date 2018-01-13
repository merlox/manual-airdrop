// Check that the airdropped accounts have more or equal the amount sent
const Web3 = require('web3')
const fs = require('fs')
const { join } = require('path')
const erc20Abi = require('./../erc20.js').abi
const erc20Address = require('./../erc20.js').address
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/6GO3REaLghR6wPhNJQcc'));
const ERC20 = new web3.eth.Contract(erc20Abi, erc20Address);
let accounts
let amounts
let fileContent = ''

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
			const resultAmount = await ERC20.methods.balanceOf(accounts[i]).call()
			console.log(`${i} Processed: ${accounts[i]} airdrop value: ${amounts[i]} real value: ${resultAmount}`)
			// Write the address if the amount is not airdropped
			if(resultAmount < amounts[i]) {
				fileContent += `${i} ${accounts[i]} : ${amounts[i]} : ${resultAmount} send: ${amounts[i] - resultAmount}\r\n`
			}
		}
	} catch(e) {
		console.log('Error', e)
	}

	fs.writeFileSync('results/not-airdropped.txt', fileContent)
}
