// controller for out authors
const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const Book = require("../models/book"); // giving access to our author model that we created
// const uploadPath = path.join("public", Book.coverImageBasePath); // this fun combines two paths
const mongoose = require("mongoose");
const imageMimeTypes = [
	"images/jpeg",
	"images/png",
	"images/gif",
	"images/jpg",
]; // all the image types that we accept
// const multer = require("multer");
// and we can use this multer variable in order to call the function on it which will help us to configure multer in order so that we acn use in our project
// 2nd argument in the ibject is a fileFilter to filter files which our server accepts
// callback fun 1st arg is if an err occured while uploadingg
// callback fun 1st arg is a boolean if our file is accepted or not
// const upload = multer({
// 	dest: uploadPath,
// 	fileFilter: (req, file, callback) => {
// 		callback(null, true);
// 	},
// });

// all books route
router.get("/", async (req, res) => {
	// 'i' is basically saying case-insensitive
	let query = Book.find();
	if (req.query.title != null && req.query.title != "") {
		query = query.regex("title", new RegExp(req.query.title, "i"));
	}
	if (req.query.publishedBefore != null && req.query.publishedBefore != "") {
		query = query.lte("publishDate", req.query.publishedBefore);
	}
	if (req.query.publishedAfter != null && req.query.publishedAfter != "") {
		query = query.gte("publishDate", req.query.publishedAfter);
	}
	try {
		// this is just going to execute our query
		const books = await query.exec();
		res.render("books/index", {
			books: books,
			searchOptions: req.query,
		});
	} catch {
		console.log("some err occured while rendering all books!!!");
		res.redirect("/");
	}
});

// new book route
router.get("/new", async (req, res) => {
	try {
		const authors = await Author.find({});
		const book = new Book(); // here when user enters the wrong data we can get back to the new page with the feilds filled to tell that they wrongly entered te data
		res.render("books/new", { authors: authors, book: book });
	} catch {
		res.redirect("/books");
	}
});

// craeet book route
// in the middleware we have name of our file given as in the form
// thsi library is also goin to add a var to our req here whih is gonna be called req.file
// we  have removed upload.single("cover"), bcoz we are no longer getting a file we are gettin a string
router.post("/", async (req, res) => {
	const authors = await Author.find({});
	// console.log(req.file.filename);
	const book = new Book({
		title: req.body.title,
		author: req.body.author,
		publishDate: new Date(req.body.publishDate),
		pageCount: req.body.pageCount,
		description: req.body.description,
	});
	// console.log(req.body);
	saveCover(book, req.body.cover); // in order to save our cover
	console.log("yha aaya");
	console.log(book);
	try {
		const newBook = await book.save();
		console.log("Book saved successfully");
		// res.redirect(`books/${newBook.id}`)
		res.redirect(`books`);
	} catch {
		// console.log(err);
		console.log("Somme err occured while saving the book!!!");
		const params = {
			authors: authors,
			book: book,
			errorMessage: "Error creating Book!!",
		};
		res.render("books/new", params);
	}

	// await book
	// 	.save()
	// 	.then((data) => {
	// 		console.log(data);
	// 		console.log("Book saved successfully!!!!!");
	// 		res.redirect("books");
	// 	})
	// 	.catch((err) => {
	// 		// console.log(err);
	// 		// console.log("Somme err occured while saving the book!!!");
	// 		// const params = {
	// 		// 	authors: authors,
	// 		// 	book: book,
	// 		// 	errorMessage: "Error creating Book!!",
	// 		// };
	// 		// res.render("books/new", params);
	// 	});
});

// we got rid of this as we are no longer saving images on our server
// // this fun will get rid of the file name that we don't want in our server
// function removeBookCover(fileName) {
// 	fs.unlink(path.join(uploadPath, fileName), (err) => {
// 		console.log(err);
// 	});
// }

function saveCover(book, coverEncoded) {
	console.log("Yha gya");
	// heer we r just checking if cover is valid we r saving in our book.cover
	if (coverEncoded == null) return;
	const cover = JSON.parse(coverEncoded);
	// if cover is notequal to null and also it is of the correct type
	if (cover != null) {
		// 1st param is data 2nd param is how we want to convert it from
		book.coverImage = new Buffer.from(cover.data, "base64"); // this is to creat buffer from some sort of data, heere it is base64 encoded data
		book.coverImageType = cover.type; // this way we can extract out our buffer and can convert it back to our image of the correct type
	}
}

module.exports = router;
