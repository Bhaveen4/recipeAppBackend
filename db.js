const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://bhaveen:bhaveen@cluster0.amugrzk.mongodb.net/?retryWrites=true&w=majority"
);

const Schema = mongoose.Schema;

var recipeSchema = new Schema({
  rName: String,
  rDur: Number,
  rServe: Number,
  rType: String,
  rImage: String
});

var recipeInfo = mongoose.model("recipes", recipeSchema);
module.exports = recipeInfo;
