const Web3 = require('web3')
const { join } = require('path')
const fs = require('fs')
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/6GO3REaLghR6wPhNJQcc'));
let accounts

createArrays()
start()

function createArrays() {
	const rawAddresses = fs.readFileSync(join(__dirname, '../data/addresses'), 'utf-8')
	accounts = rawAddresses.split('\r\n')
}

function start() {
	let addressFound = false
	let fileContent = ''
	if(fs.existsSync('results/invalid-addresses-found.txt')) {
		fileContent = fs.readFileSync('results/invalid-addresses-found.txt', 'utf-8')
	}
	console.log('Not valid addresses:')
	for(let i = 0; i < (accounts.length - 1); i++) {
		if(!web3.utils.isAddress(accounts[i])) {
			fileContent += `${i} ${accounts[i]}`
			console.log(`${i} ${accounts[i]}`)
			addressFound = true
		}
	}
	fs.writeFileSync('results/invalid-addresses-found.txt', fileContent)
	if(!addressFound) console.log('Congratulations! All addresses look good.')
}
