const mongoose = require('mongoose');
const config = require('./config');

const init = function (connectionString, connectionName) {
	const connection = mongoose.createConnection(
		connectionString, {
			server: {
				poolSize: 10,
				auto_reconnect:true,
			},
		}
	);
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
		console.log(`error connection to db ${connectionName}`);
	})
	connection.on('error', (error) => {
		console.error(error);
		console.log(`error connection to db ${connectionName}`);		
	})
	return connection;
}

const defaultConnection = init(config.connections.default, 'Default');
const fileStorageConnection = init(config.connections.fileStore, 'File Storage');

const closeConnection = function (connection, connName) {
	connection.close(function () {
		console.log('Mongoose default connection with DB :' + connName + ' is disconnected through app termination');
		process.exit(0);
	});
};

const gracefulExit = ()=>{
	closeConnection(defaultConnection,'Default');
	closeConnection(fileStorageConnection,'File Store');
};

process
	.on('SIGINT', gracefulExit)
	.on('SIGTERM', gracefulExit);

module.exports = {
	default: defaultConnection,
	fileStorage: fileStorageConnection,
}
