const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/imagesDB", {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

// If there were any error detected while connecting to the db
db.on("error", console.error.bind(console, "connection error"));

// If the db is successfully connected 
db.once("open", function callback(){
    console.log("db connected")
});

var uploadSchema = new mongoose.Schema({
    imagename: String
});

var uploadModel = mongoose.model("Image", uploadSchema);

module.exports = uploadModel;