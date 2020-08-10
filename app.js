const express = require("express");
const exphbs = require("express-handlebars");
const multer = require("multer");

const imageModel = require("./models/upload");

const imageData = imageModel.find();

const app = express();

// Inside public/images all the uploaded images will be stored
app.use(express.static("public/images"))

// Setting the view engine to handlebars i.e setting the extension
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

var Storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, "./public/images");
    },
    filename: function(req, file, callback){
        callback(null, file.fieldname + "_" + Date.now()+"_"+file.orgiginalname);
    }
});

var upload = multer({
    storage: Storage,
}).single("image");

app.get("/", function(req, res){
    res.render("home")
});

app.post("/", function(req, res){
    upload(req, res, function(err){
        if(err){
            console.log(err)
            return res.end("Something Went Wrong")
        }
        else{
            console.log(req.file.path)

            var filename = req.file.filename

            var imageDetails = new imageModel({
                imagename: filename
            });
            imageDetails.save(function(err, doc){
                if(err) throw err;

                imageData.exec(function(err, data){
                    if(err) throw err;

                    res.render("home", {records:data, success:true});
                })
            })
        }
    })
})

app.listen(5000, function(){
    console.log("Server is listening on Port 5000");
});