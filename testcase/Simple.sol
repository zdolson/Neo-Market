pragma solidity ^0.4.19;

contract Simple { 
    
    // should have username, password, unique passphrase, and address 
    struct User { 
        string name; 
        string password; 
        string passphrase; 
        address location; 
        bool registered; 
    }
    
    address owner;
    string greeting;
    mapping(string => User) users; 
    mapping(string => string) says; 
    
    // event logs 
    event UserRegistration(string _name, string _username, address _location);
    event SayGreet(string _name, string _greet); 

    function Simple() public {
        owner = msg.sender; 
    }
    
    function greeter(string _name, string _greet) public { 
        says[_name] = _greet;
        SayGreet(_name, _greet);
    }
    
    function greet(string _target) constant public returns (string) { 
        return _target;
    }
    
    function register(string _name, string _username, string _password, string _passphrase) public { 
        var account = users[_username];
        account.name = _name;
        account.password = _password;
        account.passphrase = _passphrase;
        // on the off chance there's a different users/computers that register
        account.location = msg.sender;
        account.registered = true; 
        UserRegistration(_name, _username, msg.sender);
    }
    
    function isRegistered(string _username) constant public returns (bool) { 
        if (users[_username].registered) {
            return true;
        } else { 
            return false;
        }
    }
    
    function kill() public { 
        if (msg.sender == owner) {
            selfdestruct(owner);
        }
    }
    
    
}