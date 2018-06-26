const mongoose = require('mongoose');
const connection = require('../connection-init').default;

const {
    categories,
    regions,
    services,	
} = require('../../../common/enums/adv');

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
    props:{
        price: mongoose.SchemaTypes.Number,
        currency : mongoose.SchemaTypes.String,
        description: mongoose.SchemaTypes.String,
        category : {
            type: mongoose.SchemaTypes.String ,
            enum : Object.keys(categories).map(key=>categories[key]) },
        region : {
            type :  mongoose.SchemaTypes.String ,
            enum : Object.keys(regions).map(key=>regions[key])
        },
        service : {
            type :  mongoose.SchemaTypes.String ,
            enum : Object.keys(services).map(key=>services[key])
        },
        images :  mongoose.SchemaTypes.Array,
        views: mongoose.SchemaTypes.Number,
    }
});

module.exports = connection.model('Adv', advSchema);