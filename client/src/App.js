import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home} from "./pages/home";
import {Auth} from "./pages/auth";
import {CreateRecipe} from "./pages/create-recipe";
import {SavedRecipes} from "./pages/saved-recipes";
import {Navbar} from "./components/navbar";
import { useCookies } from 'react-cookie';

function App() {

    // We need to use the useCookies hook to set the cookie. _ is a variable that we don't need
    const [cookies, _] = useCookies(["access_token"]);


  return (
    <div className="App">
      <Router>
        {/* Navbar shall be above Routes (as it is not a Route) but under Router in order to use 'Link' component */}
        <Navbar />
        <Routes>
          <Route path="/" element = {!cookies.access_token ? <Auth/> : <Home />} />
          <Route path="/auth" element = {<Auth />} />
          <Route path="/create-recipe" element = {<CreateRecipe />} />
          <Route path="/saved-recipes" element = {<SavedRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
