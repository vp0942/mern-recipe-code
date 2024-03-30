import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

export const Home = () => {

  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  // We need to use the useCookies hook to set the cookie. _ is a variable that we don't need
  const [cookies, _] = useCookies(["access_token"]);

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
        setSavedRecipes(response.data.savedRecipes);
        // console.log(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipe();
    if(cookies.access_token) fetchSavedRecipe();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      }, {
        headers: {
          authorization: cookies.access_token,
        },
      });
      // We need to update the state with the data from the server
      setSavedRecipes(response.data.savedRecipes);
      // console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  const isRecipeSaved = (recipeID) => {
    return savedRecipes.includes(recipeID);
  }

  return <div>
    <h1> Recipes</h1>
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe._id}>
          <div>
            <h2>{recipe.name}</h2>
            <button
              onClick={() => saveRecipe(recipe._id)}
              disabled={isRecipeSaved(recipe._id)}
            >
              {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
            </button>
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