// this is a singular form of model and we are creating a model for that db
const mongoose = require('mongoose');

// cfreating a schema for our authors table
const authorSchema = new mongoose.Schema({
	// here we atre going tpo define different columns of our schema
	// as a nosql db we are just havigna json object
	// type and required are going to be the most common things that you are going to use while setting up a schema
	name: {
		type: String,
		required: true
	}
})

// here we set module.exports to a new model
//' Author ' is essentially going to be the name of our table
// authorSchema is the schema that defines that table
module.exports = mongoose.model('Author', authorSchema)




