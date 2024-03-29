import express from "express";
import {RecipeModel} from "../models/Recipes.js";
import {UserModel} from "../models/Users.js";

const router = express.Router();

// Get all recipes
router.get("/", async (req, res) => {
  try {
    // Find all recipes in the database
    const recipes = await RecipeModel.find({});
    res.status(200).json(recipes);

  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

// Create a new recipe
router.post("/", async (req, res) => {
  // Create a new recipe using the RecipeModel and the request body
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.status(201).json(response);

  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

// Save a recipe - by adding the recipeId to the user's savedRecipes array and updating the database
router.put("/", async (req, res) => {

  // we need to get {userId, recipeId} from the request body in order to add the recipeId to the user's savedRecipes array
  // before updating the database
  const recipe = await RecipeModel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);

  try {
    // push the recipeId to the user's savedRecipes array
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({sevedRecipes: user.savedRecipes});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

// Get all recipe IDs saved by the logged user
// We will use req.params.userID to get the user's _id from the URL
router.get("/savedRecipes/ids/:userID", async (req, res) => {
  try {
    // Find the user whose _id is in the request body
    const user = await UserModel.findById(req.params.userID);
    res.status(201).json({savedRecipes: user?.savedRecipes});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

// Get all recipes saved by the logged user
router.get("/savedRecipes", async (req, res) => {
  try {
    // Find the user whose _id is in the request body
    const user = await UserModel.findById(req.body.userID);

    // Find all recipes whose _id is in the user's savedRecipes array
    const savedRecipes = await RecipeModel.find({_id: {$in: user?.savedRecipes}});

    res.status(201).json(savedRecipes);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

export {router as recipesRouter};