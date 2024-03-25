import {useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

export const Auth = () => {
  return (
    <div className="auth">
      <Login/>
      <Register/>
    </div>
  )
}

// Components that are used in the Auth component only
// Login and Register components are almost the same, so we can create a single component called Form
const Login = () => {
  // We need to add a new state for the Login component
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // We need to use the useCookies hook to set the cookie. _ is a variable that we don't need
  const [_, setCookies] = useCookies(["access_token"]);

  // We need to use the useNavigate hook to redirect the user to the home page
  const navigate = useNavigate();

  // Function that will be called when the form is submitted
  const onSubmit = async (event) => {
    // Prevent the default behavior of the form - refreshing the page
    event.preventDefault();

    // Send the data to the server - we will use axios
    try {
      // Here we need the token that we will get from the server in the response
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password
      });

      // We can see the response in the console
      console.log("response", response);

      // Set the cookie with the token that we got from the server
      setCookies("access_token", response.data.token);

      // Store the UserID from the response in the local storage
      window.localStorage.setItem("userID", response.data.userID);

      // Redirect the user to the home page
      // React hook alternative to window.location.href = "/"
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  )
}

const Register = () => {
  // We need to add a new state for the Register component
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function that will be called when the form is submitted
  const onSubmit = async (event) => {
    // Prevent the default behavior of the form - refreshing the page
    event.preventDefault();

    // Send the data to the server - we will use axios
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password
      });
      alert("Registration completed. Now you can login")
    } catch (err) {
      console.error(err);
    }

  }

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    />
  )
}

const Form = ({username, setUsername, password, setPassword, label, onSubmit}) => {
  return <div className="auth-container">
    <form onSubmit={onSubmit}>
      <h2> {label} </h2>
      <div className="form-group">
        <label htmlFor="username"> Username: </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password"> Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit"> {label} </button>
    </form>
  </div>
}