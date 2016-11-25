var mongoose = require("mongoose")
var RecipeSchema = new mongoose.Schema({
  name: String,
  desc: String,
  preptime: String,
  cooktime: String,
  ingredient: [{
    type: String
  }],
  direction: [{
    type: String
  }]

})
mongoose.Promise = global.Promise

// define model
mongoose.model("Recipe", RecipeSchema)
// define database
mongoose.connect("mongodb://localhost/project4")

module.exports = mongoose;
