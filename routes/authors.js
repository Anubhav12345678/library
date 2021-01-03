// controller for out authors
const express = require("express");
const router= express.Router();
const Author  = require("../models/author");// giving access to our author model that we created
const mongoose = require('mongoose');
// All authors route
router.get("/", async (req, res)=>{
	    // WHEN SEARCHING WE GET A REQUEST USING "GET" to this route and a get request sends information throught the query string
		// we want to create a new object which will store all of pour search objects
		let searchOptions = {}// then we r going to search for all the different request parameters that we
		//  sent and add them to our search options 
		if( req.query.name != null && req.query.name !== '' ) {
			// regular expression lets us do is search for part of text inside of our field in the simplest case
			// so if we send 'jo' instead of 'john' we will still get 'john'
			//the i flag is telling for it to be case-insensitive
			searchOptions.name = new RegExp(req.query.name, 'i');
		}
	       try {
			  // we get all our authors and we want to await our function on oour author model
			  const authors = await Author.find(searchOptions) // inside this object is where we put all of our where conditions but here
			  // we say that we have no conditions and we want all authors
			  res.render('authors/index', { authors: authors, searchOptions: req.query })
		   } catch {
			  // and if for some reason anything goes wrong or db doesn't respond
			  console.log('MongoDB server is having some error!!');
			  res.redirect('/')
		   } 
	
})

// new author creation and in this only form would be there
router.get("/new", (req, res)=>{
	res.render('authors/new', { author: new Author() });
})

// this route is for actuallty creaing the author
router.post("/", (req, res)=>{

	const author = new Author({
		name: req.body.name
	})  
	author.save(( err, newAuthor )=> {
		if(err) {
			console.log('Some error has been created');
			res.render('authors/new', { author: author, errorMessage: 'Error Creating Author' }) // here we are also passing
			 // some parameters to the form page in case of error
		} else { // if we are not getting any author we are  redirecting to the newAuthor's page
            // res.redirect('authors/' + newAuthor.id);
            console.log('Author saaved to our database');
            res.redirect('authors');
		}
	})// to save the new author to our db
})

module.exports = router;