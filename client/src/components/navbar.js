import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";


export const Navbar = () => {

  // We need to use the useCookies hook to set the cookie. _ is a variable that we don't need
  const [cookies, setCookies] = useCookies(["access_token"]);

  // We need to use the useCookies hook to get the cookie from the browser
  // We need to use the useNavigate hook to redirect the user to the Auth pages
  const navigate = useNavigate();

  const logout = () => {
    // We need to remove the cookie when the user logs out
    setCookies("access_token", "");
    // We need to remove the UserID from the local storage
    window.localStorage.removeItem("userID");
    // Redirect the user to the home page
    // React hook alternative to window.location.href = "/auth"
    navigate("/auth");
  }

  // In a real application we would check whether the access_token is valid!
  return <div className="navbar">
    {!cookies.access_token ? (<Link to="/auth">Auth</Link>) : (
      <>
        <Link to="/">Home</Link>
        <Link to="/create-recipe">Create Recipe</Link>
        <Link to="/saved-recipes">Saved Recipes</Link>
        <button onClick={logout}> Logout</button>
      </>
    )
    }
  </div>
}