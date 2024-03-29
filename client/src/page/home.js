import {useEffect, useState} from "react";
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID";

export const Home = () => {

  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  // We will use the useEffect hook to fetch the data from the server
  // useEffect will run when the component rendered
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // We need to get the data from the server
        const response = await axios.get("http://localhost:3001/recipes");
        // We need to update the state with the data from the server
        setRecipes(response.data);
        // console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    // We need to fetch the saved recipes
    const fetchSavedRecipe = async () => {
      try {
        // We need to get the data from the server
        // We will use req.params on the server to get the saved recipes
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
        // We need to update the state with the data from the server
        // setSavedRecipes(response.data);
        console.log(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipe();
    fetchSavedRecipe();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      // console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  return <div>
    <h1> Recipes</h1>
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe._id}>
          <div>
            <h2>{recipe.name}</h2>
            <button onClick={()=>saveRecipe(recipe._id)}> Save</button>
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