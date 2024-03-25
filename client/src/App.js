import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home} from "./page/home";
import {Auth} from "./page/auth";
import {CreateRecipe} from "./page/create-recipe";
import {SavedRecipes} from "./page/saved-recipes";
import {Navbar} from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        {/* Navbar shall be above Routes (as it is not a Route) but under Router in order to use 'Link' component */}
        <Navbar />
        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="/auth" element = {<Auth />} />
          <Route path="/create-recipe" element = {<CreateRecipe />} />
          <Route path="/saved-recipes" element = {<SavedRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
