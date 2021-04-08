// here we are going to set all routes for the index of our application
const express = require("express");
const router = express.Router();
const Book = require("../models/book");

router.get("/", async (req, res) => {
	// we have provide top 10 most recently added books
	let books = [];
	try {
		books = await Book.find().sort({ createdAt: -1 }).limit(10).exec();
	} catch {
		console.log("Some err occured while rendering books on the main page");
		books: [];
	}
	res.render("index", { books: books });
});

module.exports = router;
