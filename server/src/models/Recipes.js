import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  name: {type: String, required: true},
  ingredients: [{type: String, required: true}],
  instructions: {type: String, required: true},
  imageUrl: {type: String, required: true},
  cookingTime: {type: Number, required: true},
  userOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
})
// userOwner is a reference to the user who created the recipe
// ObjectId is a special type in MongoDB that is used to store the unique identifier of a document
// ref: 'users' tells Mongoose that this field is a reference to the 'users' collection


// Create a collection or table called 'users' and store our schema there
// Create manually 'mern-recipe-code' database and 'users' collection in MongoDB Compass too
export const RecipeModel = mongoose.model('recipes', RecipeSchema);