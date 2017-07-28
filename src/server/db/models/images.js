const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
	createDate: {
		type: mongoose.SchemaTypes.Date,
		required: [true],
	},
	mimetype:{type: mongoose.SchemaTypes.String},
	data: mongoose.SchemaTypes.Buffer
});

const connection  = mongoose.createConnection('mongodb://reklamatmpmfile:reklamatmpmfile@ds125113.mlab.com:25113/reklamapmtm_filestorage');
module.exports = connection.model('Image', imageSchema);