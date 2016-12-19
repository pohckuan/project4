var express  = require("express");
var parser   = require("body-parser")
var hbs      = require("express-handlebars");
var mongoose = require("./db/connection");

var app     = express();

var Recipe = mongoose.model("Recipe");

app.set("port", process.env.PORT || 4001)
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public"));

app.use(parser.json({extended: true}))

app.get("/api/recipes", function(req, res){
  Recipe.find({}).then(recipes => {
    res.json(recipes)
  })
  });

  app.get("/api/recipes/:name", function(req, res){
    Recipe.findOne({name: req.params.name}).then(function(recipe){
      res.json(recipe)
    })
  })

app.post("/api/recipes", function(req, res){
  var splitIngredients = req.body.ingredient
  var splitDirections = req.body.direction
  var newrecipebody = req.body
  newrecipebody.ingredient = splitIngredients.split('\n')
  newrecipebody.direction = splitDirections.split('\n')
  Recipe.create(newrecipebody).then(function(recipe){
    res.json(recipe);
    });
});

app.delete("/api/recipes/:name", function(req, res){
  Recipe.findOneAndRemove({name: req.params.name}).then(function(){
    res.json({success: true})
  })
})



app.put("/api/recipes/:name", function(req, res){
  var splitIngredients = req.body.ingredient
  var splitDirections = req.body.direction
  var newrecipe = req.body
  newrecipe.ingredient = splitIngredients.split('\n')
  newrecipe.direction = splitDirections.split('\n')

  Recipe.findOneAndUpdate({name: req.params.name}, newrecipe, {new: true}).then(function(recipe){
    res.json(recipe)
  });
})



app.get("/*", function(req, res){
  res.render("recipes");
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
