import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

export const SavedRecipes = () => {

  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  // We will use the useEffect hook to fetch the data from the server
  // useEffect will run when the component rendered
  useEffect(() => {

    // We need to fetch the saved recipes
    const fetchSavedRecipe = async () => {
      try {
        // We need to get the data from the server
        // We will use req.params on the server to get the saved recipes
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
        // We need to update the state with the data from the server
        setSavedRecipes(response.data.savedRecipes);
        // console.log(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

     fetchSavedRecipe();
  }, []);

  return <div>
    <h1> Recipes</h1>
    <ul>
      {savedRecipes.map((recipe) => (
        <li key={recipe._id}>
          <div>
            <h2>{recipe.name}</h2>
          </div>
          <div className="instruction">
            <p>{recipe.instructions}</p>
          </div>
          <img src={recipe.imageUrl} alt={recipe.name} />
          <p>Cooking time: {recipe.cookingTime} (minutes)</p>
        </li>
      ))}
    </ul>
  </div>
}