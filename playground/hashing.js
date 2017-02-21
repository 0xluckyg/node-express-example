const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function passwordHashExample() {
    let password = 'password123';

    //Time that takes to complete hash, to prevent brute force attacks
    bcrypt.genSalt(10, (err, salt) => {
        //Salt is generated for each password to prevent guessing passwords
        bcrypt.hash(password, salt, (err, hash) => {
            console.log('HASH: ', hash);
        })
    })
}

function validateUserWhenLogin() {
    let password = 'password123';
    let hashedPassword = '9da4d19e100809d42da806c2b7df5cf37e72623d42f1669eb112e23f5c9d45a3';

    bcrypt.compare(password, hashedPassword, (err, res) => {
        console.log(res);
    });
}

function jsonWebTokenExample() {
    let data = {
        id: 10
    }
    //123abc is the salt (secret)
    let token = jwt.sign(data, '123abc');
    //doesn't match (throws error)
    // let decoded = jwt.verify(token, '123abcc');
    //matches
    let decodedMatch = jwt.verify(token, '123abc');
    console.log(decodedMatch);
}

function cryptoExample() {

    let message = 'I am user number 3';
    let hash = SHA256(message).toString();

    console.log(message);
    console.log(hash);

    let data = {
        id: 4
    }
    let token = {
        data,
        hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
    }
    let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

    //Example of trying to update data without salt
    token.data.id = 5;
    token.hash = SHA256(JSON.stringify(token.data)).toString();

    if (resultHash === token.hash) {
        console.log('Data was not changed');
    } else {
        console.log('Data was changed');
    }

}

passwordHashExample();
jsonWebTokenExample();
cryptoExample();
