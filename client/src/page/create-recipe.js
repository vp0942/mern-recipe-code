import {useState} from "react";

export const CreateRecipe = () => {

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: 0,
  });

  // We need to update the recipe state when the user types in the form
  const handleChange = (event) => {
    // We need to update the recipe state when the user types in the form
    setRecipe({
      ...recipe,
      [event.target.name]: event.target.value,
    });
  }

  // We need to update the ingredient in the ingredients array while the user types
  const handleIngredientChange = (event, idx) => {

    // We need to update the ingredient in the ingredients array
    const newIngredients = [...recipe.ingredients];

    // We need to update the ingredient at the idx position
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
    // We need to add a new ingredient to the ingredients array
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, ""],
    });
  }

  // console.log(recipe);

  // The Add Ingredient button must be of type button to prevent the form from being submitted!!!
  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form>
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
        <button type="button"> Create Recipe</button>
      </form>
    </div>
  )
}