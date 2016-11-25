var mongoose  = require("./connection.js");
var seedData  = require("./seeds.json");

var Recipe = mongoose.model("Recipe");


Recipe.remove({}).then(function(){
  Recipe.collection.insert(seedData).then(function(){
    process.exit();
  });
});
