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

app.use(parser.urlencoded({extended: true}))

// app.get("/recipes", (req, res) => {
//   Recipe.find({}).then(recipes => {
//     res.render("index", {
//       recipes: recipes
//     })
//   })
// })
app.get("/api/recipes", function(req, res){
  Recipe.find({}).then(recipes => {
    res.json(recipes)
  })
  });

//   app.post("/recipes", function(req, res){
//     var split = req.body.recipe.ingredient.split('\r\n')
//     var splitdirection = req.body.recipe.direction.split('\r\n')
//     var newrecipe = req.body.recipe
//     newrecipe.ingredient = split
//     newrecipe.direction = splitdirection
//     console.log(newrecipe)
//   Recipe.create(newrecipe).then(function(recipe){
//     res.redirect(`recipes/${recipe.name}`);
//     });
// });

app.post("/recipes", function(req, res){
  var split = req.body.recipe.ingredient.split('\r\n')
  var splitdirection = req.body.recipe.direction.split('\r\n')
  var newrecipe = req.body.recipe
  newrecipe.ingredient = split
  newrecipe.direction = splitdirection
  console.log(newrecipe)
Recipe.create(newrecipe).then(function(recipe){
  res.json(recipe);
  });
});

// app.get("/recipes/:name", function(req, res){
//   Recipe.findOne({name: req.params.name}).then(function(recipe){
//     res.render("show", {
//       recipe: recipe
//     })
//   })
// })

app.get("/api/recipes/:name", function(req, res){
  Recipe.findOne({name: req.params.name}).then(function(recipe){
    res.json(recipe)
  })
})

// app.post("/recipes/:name", function(req, res){
//   var split = req.body.recipe.ingredient.split('\r\n')
//   var splitdirection = req.body.recipe.direction.split('\r\n')
//   var newrecipe = req.body.recipe
//   newrecipe.ingredient = split
//   newrecipe.direction = splitdirection
//   Recipe.findOneAndUpdate({name: req.params.name}, newrecipe, {new: true})
//   .then(function(recipe){
//     res.redirect(`/recipes/${recipe.name}`)
//   })
// })

app.put("/api/recipes/:name", function(req, res){
  var split = req.body.recipe.ingredient.split('\r\n')
  var splitdirection = req.body.recipe.direction.split('\r\n')
  var newrecipe = req.body.recipe
  newrecipe.ingredient = split
  newrecipe.direction= splitdirection
  Recipe.findOneAndUpdate({name: req.params.name}, newrecipe, {new: true})
  .then(function(recipe){
    res.json(recipe)
  })
})

// app.post("/recipes/:name/delete", function(req, res){
//   Recipe.findOneAndRemove({name: req.params.name}).then(function(){
//     res.redirect("/recipes")
//   })
// })

app.delete("/api/recipes/:name", function(req, res){
  Recipe.findOneAndRemove({name: req.params.name}).then(function(){
    res.json({success: true})
  })
})

app.get("/*", function(req, res){
  res.render("recipes");
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
