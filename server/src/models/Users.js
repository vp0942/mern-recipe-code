import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  savedRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'recipes'}],
})

// Create a collection or table called 'users' and store our schema there
// Create manually 'mern-recipe-code' database and 'users' collection in MongoDB Compass too
export const UserModel = mongoose.model('users', UserSchema);