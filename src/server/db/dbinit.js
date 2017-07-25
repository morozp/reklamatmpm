var mongoose = require('mongoose');

mongoose.connect('mongodb://reklamatmpm:reklamatmpm123@ds117093.mlab.com:17093/reklamatmpm',{
    server:{
        poolSize: 10,
    }
});

mongoose.connection.on('error',(err)=>
{
    console.error("Database Connection Error: " + err);
    console.error('MongoDB SERVER NOT AVAILABLE!');
    process.exit(2);
});

mongoose.connection.on('connected',()=>
{
    console.info("Successfully connected to MongoDB Database"); 
});