// Put the accounts and the amounts in the respective files. Make sure they are properly formatted by checking the length of each line when you put all the addresses in a file with an address per line

const fs = require('fs')
const accounts = require('./accounts.js')
const amounts = require('./amounts.js')
const batchSize = 150
const steps = Math.ceil(accounts.length / batchSize)
let fileContent = ''
let lastPosition = 0

for(let i = 0; i < steps; i++) {
	let finalPosition
	finalPosition = (i + 1) * batchSize
	let cutAccounts = accounts.slice(lastPosition, finalPosition)
	cutAccounts = '["' + cutAccounts.join('","') + '"]'
	let cutAmounts = amounts.slice(lastPosition, finalPosition)
	cutAmounts = '["' + cutAmounts.join('","') + '"]'

	fileContent += `// ${i+1}\r\n${cutAccounts}, ${cutAmounts}\r\n\r\n`
	lastPosition = finalPosition
}
fs.writeFileSync('results.txt', fileContent)
