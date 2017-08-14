const mongoose = require('mongoose');
const connection = require('../connection-init').default;

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, "usernameRequired"],
		maxLength: [32, "tooLong"],
		minLength: [6, "tooShort"],
		match: [/^[a-z0-9]+$/, "usernameIncorrect"],
		unique: true,
	},
	
	password: {
		type: String,
		maxLength: [32, "tooLong"],
		minLength: [8, "tooShort"],
		match: [/^[A-Za-z0-9]+$/, "passwordIncorrect"],
		required: [true, "passwordRequired"],
	},
});

module.exports = connection.model('User', userSchema);