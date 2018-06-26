var mongoose = require('mongoose');

var connection = mongoose.createConnection('mongodb://reklamatmpmfile:reklamatmpmfile@ds125113.mlab.com:25113/reklamapmtm_filestorage');

connection.on('error',(err)=>
{
    console.error('File Storage Database Connection Error: ' + err);
    console.error('File Storage  SERVER NOT AVAILABLE!');
    process.exit(2);
});

connection.on('connected', () =>
{
    console.info('Successfully connected to File Storage Database'); 
});

mongoose.fileStorageConnection = connection;
