import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {UserModel} from "../models/Users.js";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already in the database
  const user = await UserModel.findOne({username});

  // If the user exists, return an error
  if (user) {
    return res.status(400).json({message: "User already exists"});
  }

  // If the user does not exist, create a new user
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user (in MongoDb using Mongoose) with the username and "hashed" password
  const newUser = new UserModel({username, password: hashedPassword});

  // Save the user to the database
  await newUser.save();

  res.json({message: "User created"});
});

// Login a user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  const user = await UserModel.findOne({username});

  // If the user does not exist, return an error
  if (!user) {
    return res.status(400).json({message: "User does not exist"});
  }

  // Check if the password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({message: "Invalid credentials"});
  }

  // Create a JWT token
  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
  res.json({token, userID: user._id});
});



export {router as usersRouter};