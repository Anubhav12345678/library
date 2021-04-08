// controller for out authors
const express = require("express");
const router = express.Router();
const Author = require("../models/author"); // giving access to our author model that we created
const mongoose = require("mongoose");
const Book = require("../models/book");
// All authors route
router.get("/", async (req, res) => {
	// WHEN SEARCHING WE GET A REQUEST USING "GET" to this route and a get request sends information throught the query string
	// we want to create a new object which will store all of pour search objects
	let searchOptions = {}; // then we r going to search for all the different request parameters that we
	//  sent and add them to our search options
	if (req.query.name != null && req.query.name !== "") {
		// regular expression lets us do is search for part of text inside of our field in the simplest case
		// so if we send 'jo' instead of 'john' we will still get 'john'
		//the i flag is telling for it to be case-insensitive
		searchOptions.name = new RegExp(req.query.name, "i");
	}
	try {
		// we get all our authors and we want to await our function on oour author model
		const authors = await Author.find(searchOptions); // inside this object is where we put all of our where conditions but here
		// we say that we have no conditions and we want all authors
		res.render("authors/index", {
			authors: authors,
			searchOptions: req.query,
		});
	} catch (err) {
		console.log(err);
		// and if for some reason anything goes wrong or db doesn't respond
		console.log("MongoDB server is having some error!!");
		res.redirect("/");
	}
});

// new author creation and in this only form would be there
router.get("/new", (req, res) => {
	res.render("authors/new", { author: new Author() });
});

// this route is for actuallty creaing the author
router.post("/", async (req, res) => {
	const author = new Author({
		name: req.body.name,
	});
	await author.save((err, newAuthor) => {
		if (err) {
			console.log("Some error has been created");
			res.render("authors/new", {
				author: author,
				errorMessage: "Error Creating Author",
			}); // here we are also passing
			// some parameters to the form page in case of error
		} else {
			// if we are not getting any author we are  redirecting to the newAuthor's page
			// res.redirect('authors/' + newAuthor.id);
			console.log("Author saaved to our database");
			res.redirect(`/authors/${newAuthor.id}`);
		}
	}); // to save the new author to our db
});

router.get("/:id", async (req, res) => {
	try {
		const author = await Author.findById(req.params.id);
		const booksByAuthor = await Book
			.find({ author: author.id })
			.limit(6)
			.exec();
		res.render("authors/show", {
			author: author,
			booksByAuthor: booksByAuthor,
		});
	} catch (err) {
		console.log(err);
		console.log("Some error occured in getting the author or its books");
		res.redirect("/");
	}
});

router.get("/:id/edit", async (req, res) => {
	try {
		const author = await Author.findById(req.params.id);
		res.render("authors/edit", { author: author });
	} catch (err) {
		console.log(err);
		console.log(
			"Some  err occured whiel getting the specific author from db!!"
		);
		res.redirect("/authors");
	}
});

// update router using rest principles this is done using put
router.put("/:id", async (req, res) => {
	// const author = new Author({
	// 	name: req.body.name,
	// });
	let author;
	try {
		author = await Author.findById(req.params.id);
		author.name = req.body.name;
		await author.save();
		res.redirect(`/authors/${author.id}`);
	} catch (err) {
		console.log(err);
		if (author == null) {
			// means we failed in findingg the author from db
			console.log("Author nhi mila db se");
			res.redirect("/");
		} else {
			res.render("authors/edit", {
				author: author,
				errorMessage: "Error updating the Author",
			});
		}
	}
});

// delete author
router.delete("/:id", async (req, res) => {
	let author;
	try {
		author = await Author.findById(req.params.id);
		await author.remove(); // delete the author from our database
		res.redirect("/authors");
	} catch (err) {
		console.log(err);
		if (author == null) {
			// means we failed in findingg the author from db
			console.log("Author del nhi ho paya db se ");
			res.redirect("/");
		} else {
			res.redirect(`/authors/${author.id}`);
		}
	}
});

// we cannot place a put or delete req from our from for that we require a lib method-override, it allows
//  us to send a additional param with our form that tells our server if it's a put or delete request

module.exports = router;
