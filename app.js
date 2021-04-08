require("dotenv").config();
const express = require("express");
const app = express();
const bp = require("body-parser");
const ejs = require("ejs");
const PORT = process.env.PORT || 3000;
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
// const connectDB = require("./config/keys");
// connectDB();

// DB CONNECTION
const url = process.env.MONGODB_URL;
// console.log(url);
mongoose
	.connect(url, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
	})
	.then(() => {
		console.log("Connected to database ");
	})
	.catch((err) => {
		console.error(`Error connecting to the database. \n${err}`);
	});
// const connection = mongoose.connection;
// connection
// 	.once("open", () => {
// 		console.log("Database connected...");
// 	})
// 	.catch((err) => {
// 		console.log("Connection failed...");
// 	});

app.use(bp.json());
app.use(bp.urlencoded({ limit: "10mb", extended: false }));

// view engine
app.set("view engine", "ejs");
// also we would set where our views are gonna be coming from
app.set("views", __dirname + "/views");

// now we want to set up what our layout file is going to be
app.set("layout", "layouts/layout");
// we want to tell  express app that we want to use express layouts
app.use(expressLayouts);
// now we are telling where our static files would be
app.use(express.static("public")); // css files, html files, images
// import the router into our server
app.use("/", require("./routes/index"));
app.use("/authors", require("./routes/authors")); // author router
// routes are basically like controllers which will redirect our request to models or views we are doing it in other folder
// as it will ber very hazy if we put everything in here app.js
app.use("/books", require("./routes/books"));

// use section
// limit: 10mb is just incresing the limit size that our server can accept that will be useful when we are uploading files to our server

app.listen(PORT, function () {
	console.log("Server running at 3000");
});
