// this is a singular form of model and we are creating a model for that db
const mongoose = require("mongoose");

// cfreating a schema for our authors table
const bookSchema = new mongoose.Schema({
	// here we atre going tpo define different columns of our schema
	// as a nosql db we are just havigna json object
	// type and required are going to be the most common things that you are going to use while setting up a schema
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	publishDate: {
		type: Date,
		required: true,
	},
	pageCount: {
		type: Number,
		required: true,
	},
	createdAtDate: {
		// this is for sorting out books on the home page as most recently added to least recently added
		type: Date,
		required: true,
		default: Date.now,
	},
	coverImage: {
		// in this we are just storing the name of the image in the mongodb daatabase so that wew store a single small
		// string and we can actual store the actual image on our serrver
		// it will no longer be the name of the image but it will be a buffer representaing our entire data
		type: Buffer,
		required: true,
	},
	coverImageType: {
		type: String,
		required: true,
	},
	author: {
		// we want to reference the author collection that we created earlier4
		// thsi is the id of the author instaed of the whole object
		type: mongoose.Schema.Types.ObjectId, // telling mongodb that we want to refer another model from the saame db that we created
		required: true,
		// we have to tell mongoose what we are referrencing
		ref: "Author", // same as the name of the model that we created and are trying to reference here
	},
});
// this virtual pro is same as the objects above however it will derive its values usin the above fields
bookSchema.virtual("coverImagePath").get(function () {
	// normal fun used bcos we want to use "this" which will denote actual book itself
	// here "/" denotes public folder
	if (this.coverImage != null && this.coverImageType != null) {
		return `data:${
			this.coverImageType
		};charset=utf-8;base64,${this.coverImage.toString("base64")}`;
	}
});

// here we set module.exports to a new model
//' Book ' is essentially going to be the name of our table
// authorSchema is the schema that defines that table
module.exports = mongoose.model("Book", bookSchema);
