var express = require("express");
var parser = require("body-parser")
var hbs     = require("express-handlebars");
var mongoose     = require("./db/connection");

var app     = express();

var Recipe = mongoose.model("Recipe");

app.listen(4000, ()=>{
  console.log("Connected")
})
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public"));

app.use(parser.urlencoded({extended: true}))
app.get("/", function(req, res){
  res.render("welcome")
})

app.get("/recipes", (req, res) => {
  Recipe.find({}).then(recipes => {
    res.render("index", {
      recipes: recipes
    })
  })
})
app.get("/api/recipes", function(req, res){
  Recipe.find({}).then(recipes => {
    res.json(recipes)
  })
  });
