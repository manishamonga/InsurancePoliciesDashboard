
const moongose = require ('mongoose');
const config = require('config');

console.log('connectionURI',config.mongohost);
moongose.connect(config.mongohost,(err) => {
    if(!err){
      console.log('Connected to database');
    }
    else{
      console.log('Error in DB connection:' + JSON.stringify(err));
    }
});
