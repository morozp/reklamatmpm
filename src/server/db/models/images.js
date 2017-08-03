const mongoose = require('mongoose');
const connection = require('../connection-init').fileStorage;

const imageSchema = mongoose.Schema({
	createDate: {
		type: mongoose.SchemaTypes.Date,
		required: [true],
	},
	mimetype:{
		type: mongoose.SchemaTypes.String
	},
	data: mongoose.SchemaTypes.Buffer
});


module.exports = connection.model('Image', imageSchema);