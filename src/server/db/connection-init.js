const mongoose = require('mongoose');
const config = require('./config');

const init = function (connectionString, connectionName) {
	var args = [
		 connectionString,
		{
			server: {
				poolSize: 10,
				auto_reconnect:true,
			},
			useMongoClient: true,
		}];

	const connection = mongoose.createConnection();
	connection.openOptions = args;
	connection.open(connection.openOptions);
	connection.on('connecting', () => {
		console.log(`Try connect to db ${connectionName}`);
	});
	connection.on('connected', () => {
		console.log(`connected connection to db ${connectionName}`);
	});
	connection.on('open', () => {
		console.log(`Open connection to db ${connectionName}`);
	});
	connection.on('close', () => {
		console.log(`Close connection to db ${connectionName}`);
	});
	connection.on('reconnected', () => {
		console.log(`reconnected connection to db ${connectionName}`);
	})
	
	connection.on('disconnected', () => {
		console.log(`disconnected connection to db ${connectionName}`);
	})

	connection.on('disconnecting', () => {
		console.log(`disconnecting connection to db ${connectionName}`);
	})

	connection.on('error',(err)=>
	{
		console.log("Database Connection Error: " + err);
		console.error('MongoDB SERVER NOT AVAILABLE!');
	});

	return connection;
}

const defaultConnection = init(config.connections.default, 'Default');
const fileStorageConnection = init(config.connections.fileStore, 'File Storage');

const closeConnection = function (connection, connName) {
	if(connection.readyState !== 0){	
		return connection.close(function () {
			console.log('Mongoose connection :' + connName + ' is disconnected through app termination');
		});
	}
	
	return Promise.resolve();
};

const gracefulExit = ()=>{
	Promise.all(
		closeConnection(defaultConnection,'Default'),
		closeConnection(fileStorageConnection,'FileStorage')
	).catch((error)=>{
		console.log(error);
	}).then(()=>{
		process.exit(0);
		process.exit(1);
		process.exit(2);
	})

	
	
	/*.catch((error)=>{
		console.log(error);
		throw error;
	})
	.then(()=>{
		closeConnection(fileStorageConnection,'File Store');
	})
	.catch((error)=>{
		console.log(error);
	})
	.then(()=>{
		process.exit(0);
	});*/
};

process
	.on('SIGINT', gracefulExit)
	.on('SIGTERM', gracefulExit);

module.exports = {
	default: defaultConnection,
	fileStorage: fileStorageConnection,
}
