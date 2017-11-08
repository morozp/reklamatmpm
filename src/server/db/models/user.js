const mongoose = require('mongoose');
const connection = require('../connection-init').default;
const authorizeTypes = require('../../../common/enums/user').authorizeTypes;

const userSchema = mongoose.Schema({
	username: {
		type: String,
		maxLength: [32, "tooLong"],
		minLength: [6, "tooShort"],
		match: [/^[a-z0-9]+$/, "usernameIncorrect"],
		unique: true,
	},
	createdDate:{
		type: Date,
		required: [true, "created Date required"],
	},
	lastLoginDate:{
		type: Date,
	},
	password: {
		type: String,
		maxLength: [32, "tooLong"],
		minLength: [8, "tooShort"],
		match: [/^[A-Za-z0-9]+$/, "passwordIncorrect"]
	},
	isAnonym:{
		type:Boolean,
		default: false,
	},
	authorizeType:{
		type :  mongoose.SchemaTypes.String ,
		enum : Object.keys(authorizeTypes).map(key=>authorizeTypes[key]),
		required: [true, "authorizeType required"],
	},
	vk:{
		id:{
			type: String
		},
	},
	facebook:{
		id:{
			type: String
		},
		token:{
			type: String
		},
		displayName:{
			type: String
		},
		photos:{
			type: String
		},
		email:{
			type: String
		},
	},
	line:{
	},
	google:{
	}


});

module.exports = connection.model('User', userSchema);