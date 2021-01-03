// mongodb+srv://guptarajni:Anubhav7&&&@cluster0.fjskh.mongodb.net/project1?retryWrites=true&w=majority
const mongoose = require("mongoose");
const URI = 'mongodb+srv://guptarajni:Anubhav7&&&@cluster0.fjskh.mongodb.net/project1?retryWrites=true&w=majority'
// this will simply connect it with our database
// this connection is a hard code URI connecting it to a serber on the web
// however if you wanted for it to connect to our local mongodb server during development and when deployed to connect to a web server
// we would write
/*
 mongoose.connect((process.env.DATABASE_URL){
    useNewUrlParser: true	
 })
 const db = mongoose.connection
 db.on('error', error=> console.log(error))
 dp.once('open', ()=> console.log('connected	'))       // thgis will execute only once
// to fill the env variables npm i --save-dev dotnev
// make an env file and in that write
// DATABASE_URL = mongoose://localhost/library
                                       <db ka nam>
*/ 
const connectDB = ()=>{
	mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
	console.log("DB CONN........");
}

module.exports = connectDB;





