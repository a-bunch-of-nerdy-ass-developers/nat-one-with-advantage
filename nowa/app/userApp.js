const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const jwtConfig = require('../configs/jwt');

const saltRounds = 12;

// TODO expiration of tokens
async function login(email, password) {
	const user = await User.findOne({email}).lean();
	if (!user) {
		throw new Error('Email or password is not correct.');
	}
	const passwordMatched = await bcrypt.compare(password, user.password);
	if (!passwordMatched) {
		throw new Error('Email or password is not correct.');
	};
	const token = jwt.sign({
	   id: user.id,
	   role: user.role,
	   email,
	}, jwtConfig.secret)
	return { token };
}

async function register(email, password, firstName, lastName) {
	// TODO check for email
	// TODO verify email

	const hashedPassword = await bcrypt.hash(password, saltRounds);
	const u = new User({
		firstName,
		lastName,
		password: hashedPassword,
		email,
	});
	await u.save();

	const token = jwt.sign({
		id: u.id,
		role: 'USER',
		email,
	}, jwtConfig.secret);
	
	return { token };
}


module.exports = {
	login,
	register,
};