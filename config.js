// The configuration used for all the apps
// Careful with the decimals, it doesn't work well with 1e8 to more decimals
// check the manual-airdrop.js file line 42 for that change
// And make sure you dont have addresses with more than 6 numbers long in the data/amounts
// like 1234567 up to 123456
module.exports = {
    decimals: 1e18,
    network: 'https://mainnet.infura.io/LS6I9T44SWF1sQ5zi8Up',
    batchSize: 200
}
