import {useState} from "react";
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID";
import {useNavigate} from "react-router-dom";

export const CreateRecipe = () => {

  // Custom hook from ./hooks that will get the UserID from the local storage
  const userID = useGetUserID();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  // We will use useNavigate to redirect the user to the home page
  const navigate = useNavigate();


  // We need to update the recipe state when the user types in the form
  const handleChange = (event) => {
    // We need to update the recipe state when the user types in the form
    // The name attribute of EACH input field will be the key of the recipe object
    setRecipe({
      ...recipe,
      [event.target.name]: event.target.value,
    });
  }

  // We need to update the ingredient in the ingredients array while the user types
  const handleIngredientChange = (event, idx) => {

    // We need to update the ingredient in the ingredients array
    const newIngredients = [...recipe.ingredients];

    // We need to only update the ingredient at the idx position in the ingredients array
    // as it was already added to the ingredients array by the addIngredient function
    // when the user clicks the button
    newIngredients[idx] = event.target.value;

    // We need to update the recipe state
    setRecipe({
      ...recipe,
      ingredients: newIngredients,
    });
  }

  // We need to add a new ingredient to the ingredients array when the user clicks the button
  const addIngredient = () => {
    // Adding another "" element to the ingredients array every time the user clicks the button
    // Pressing the button will render another input field
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, ""],
    });
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:3001/recipes", recipe);
      alert("Recipe created");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  // console.log(recipe);

  // The "Add Ingredient" button must be of type "button" to prevent the form from being submitted!!!
  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name"> Name</label>
        <input type="text" id="name" name="name" onChange={handleChange}/>
        <label htmlFor="ingredients"> Ingredients</label>
        {
          recipe.ingredients.map((ingredient, idx) => {
            return <input
              key={idx}
              type="text"
              name="ingredients"
              // It will be "" if the user didn't type anything
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, idx)}/>
          })
        }
        <button onClick={addIngredient} type="button"> Add Ingredient</button>
        <label htmlFor="instructions"> Instructions</label>
        <textarea id="instructions" name="instructions" onChange={handleChange}/>
        <label htmlFor="imageUrl"> Image URL</label>
        <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange}/>
        <label htmlFor="cookingTime"> Cooking Time (minutes)</label>
        <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange}/>
        <button type="submit"> Create Recipe</button>
      </form>
    </div>
  )
}