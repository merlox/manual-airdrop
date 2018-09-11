/*
1. Put the accounts in data/accounts
2. Put the amounts in data/amounts
*/

// Put the accounts and the amounts in the respective files. Make sure they are properly formatted by checking the length of each line when you put all the addresses in a file with an address per line

const fs = require('fs')
const { join } = require('path')
const configuration = require('./../config.js')
const batchSize = 100
let accounts
let amounts

createArrays()
init()

function createArrays() {
	const rawAddresses = fs.readFileSync(join(__dirname, '../data/addresses'), 'utf-8')
	const rawAmounts = fs.readFileSync(join(__dirname, '../data/amounts'), 'utf-8')
	accounts = rawAddresses.split('\r\n')
	amounts = rawAmounts.split('\r\n')
}

function init() {
	const steps = Math.ceil(accounts.length / batchSize)
	let fileContent = ''
	let lastPosition = 0

	for(let i = 0; i < steps; i++) {
		let finalPosition
		finalPosition = (i + 1) * batchSize
		let cutAccounts = accounts.slice(lastPosition, finalPosition)
		cutAccounts = '["' + cutAccounts.join('","') + '"]'
		let cutAmounts = amounts.slice(lastPosition, finalPosition)
		// Add the digits to all the numbers and remove the decimals
		for(let a = 0; a < cutAmounts.length; a++) {
			// 1e6 is the limit before js starts adding decimals
			// So we gotta add the "000" after that as String
			// to make sure they don't have dots as decimals, to avoid this:
			// 12389.92300000000 and get this 12389923000000000
			cutAmounts[a] = cutAmounts[a] * 1e6  + String(configuration.decimals).substring(7, Infinity)
		}
		cutAmounts = '["' + cutAmounts.join('","') + '"]'

		fileContent += `// ${i+1}\r\n${cutAccounts}, ${cutAmounts}\r\n\r\n`
		lastPosition = finalPosition
	}
	fs.writeFileSync('results/results.txt', fileContent)
}
