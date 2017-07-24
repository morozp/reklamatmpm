const mongoose = require('mongoose');

const advSchema = mongoose.Schema({
	createDate: {
		type: mongoose.SchemaTypes.Date,
		required: [true],
	},
	editDate: mongoose.SchemaTypes.Date,
	publishDate: mongoose.SchemaTypes.Date,
	isDeleted: mongoose.SchemaTypes.Bool,
	isPublished : mongoose.SchemaTypes.Bool,
	creatorId : mongoose.SchemaTypes.ObjectId,
	publisherId : mongoose.SchemaTypes.ObjectId,
});

module.exports = mongoose.model('Adv', advSchema);