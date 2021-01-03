// here we are going to set all routes for the index of our application
const express = require("express");
const router= express.Router();


router.get("/", (req, res)=>{
	res.render('index');
})


module.exports = router;