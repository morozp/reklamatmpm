
const connectionOnRequest = (connection) => {
    return  (req, res, next) => {
        // action after response
        var afterResponse = function () {
            // any other clean ups
            connection.close(function () {
                console.log('Mongoose connection disconnected');
            });
        };

        res.on('finish', afterResponse);
        res.on('close', afterResponse);
		
        if(connection.readyState === 0) // disconnect
        {
            connection.open(connection.openOptions).then(()=>{
                next();
            }).catch((error)=>{
                console.log(error);
                next();
            });
        }
        else{
            next();
        }
        // hooks to execute after response
		
    };

};

module.exports = connectionOnRequest;