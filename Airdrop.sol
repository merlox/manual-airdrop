pragma solidity ^0.4.23;

contract ERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    uint256 public totalSupply;
    function balanceOf(address who) public view returns (uint256);
    function transfer(address to, uint256 value) public returns (bool);
    function allowance(address owner, address spender) public view returns (uint256);
    function transferFrom(address from, address to, uint256 value) public returns (bool);
    function approve(address spender, uint256 value) public returns (bool);
}

contract Owned {
    address public owner;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function changeOwner(address _newOwner) public onlyOwner {
        require(_newOwner != address(0));
        owner = _newOwner;
    }
}

/// First you have to deploy the contract or set the token of the address to use
/// Second you have to send tokens to this contract address and start the airdrop
contract Airdrop is Owned {
    ERC20 public token;
    event LogAccountAmount(address indexed user, uint256 indexed amount);

    constructor(address _token) public {
        require(_token != address(0));
        token = ERC20(_token);
    }

    function setToken(address _token) public onlyOwner {
        require(_token != address(0));
        token = ERC20(_token);
    }

    /// Main Function
    function startAirdrop(address[] users, uint256[] amounts) public onlyOwner {
        require(users.length > 0 && amounts.length > 0);
        require(users.length == amounts.length);

        for(uint256 i = 0; i < users.length; i++) {
            address account = users[i];
            uint256 amount = amounts[i];

            emit LogAccountAmount(account, amount);
            token.transfer(account, amount);
        }
    }

    /// Extract tokens
    function recoverTokens(address _user, uint256 _amount) public onlyOwner {
        require(_user != address(0));
        require(_amount != 0);

        token.transfer(_user, _amount);
    }

    /// Extract ether
    function extractBalance() public onlyOwner {
        owner.transfer(address(this).balance);
    }
}
