const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: String,
	password: String,
	firstName: String,
	lastName: String,
	lastLogin: Date,
	// TODO add gender, birthday, etc
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;