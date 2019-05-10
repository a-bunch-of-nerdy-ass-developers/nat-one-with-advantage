const jwt = require('jsonwebtoken');

const jwtConfig = require('../configs/jwt');


async function login(email, password) {
    // TODO fetch from db
    const user = {
        id: 10,
        role: 'USER',
        email,
        password: '123321',
        kooft: 'folan',
    };
    const token = jwt.sign({
       id: user.id,
       role: user.role,
       email,
    }, jwtConfig.secret)
    return { token };
}

async function register(email, password, firstName, lastName) {
    // TODO insert to db

    // TODO verify email
    const token = jwt.sign({
        id: 10,
        role: 'USER',
        email,
    }, jwtConfig.secret);
    
    return { token };
}


module.exports = {
    login,
    register,
};