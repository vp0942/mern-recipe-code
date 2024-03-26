import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

import { usersRouter } from './routes/users.js';
import { recipesRouter } from './routes/recipes.js';


const app = express(); // To generate a version of our API

// Middleware

app.use(express.json()); // To parse JSON data
app.use(cors()); // To allow requests from any origin

// To use our usersRouter from "user.js" for POST requests to /auth/login or /auth/register
app.use("/auth", usersRouter);
// To use our usersRouter from "recipes.js" for requests to /recipes/...
app.use("/recipes", recipesRouter);


// Connect to our MongoDB database
mongoose.connect(process.env.BASE_URL);

// Start our API server and listen for requests on port 3001
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

