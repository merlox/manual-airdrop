# manual-airdrop
REMEMBER to change the mainnet or ropsten used in erc20.js for your needs. Right now is using the mainnet to check the airdropped addresses to see if they have the required amounts

USAGE:
1. First deploy the Airdrop.sol
2. Send tokens to Airdrop.sol from the token to the airdrop contract enough to pay for the transfers. You can extract the tokens and ether later
3. Set up your addresses in data/addresses and amounts in data/amounts
4. Execute "node apps/manual-airdrop" to generate your accounts
5. Start the airdrop from remix

This application allows you to prepare the addresses and amounts in batches. Set the accounts in the accounts.js file and the amounts.js and execute the manual-airdrop.js for getting results.txt with all the batches so you can airdrop all of those manually.

Note that this works for tokens with 18 decimals, for different amounts check the 3 apps and change em

1. Npm install
2. Delete all the files inside results/ or recreate the folder to make it empty for seeing the changes
3. Change the address inside erc20.js to the token that you'll use
4. Run node apps/check-addresses to see if there are any invalid addresses
5. Run node apps/check-airdrop to check if the amounts airdropped are completed or not but before doing that make sure that the network you are using is mainnet. If not, change that inside that app
6. Run node apps/manual-aidrop to generate the results.txt file that you'll use for the airdrop in your smart contract which is Airdrop.sol, make sure you deploy it with the right token address before using it
