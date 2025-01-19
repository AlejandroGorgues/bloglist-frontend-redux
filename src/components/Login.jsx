import { useState } from "react";
import blogsService from "../services/blogs.js";
import authorService from "../services/authors.js";
import loginService from "../services/login";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer.js";
import { setUser } from "../reducers/userReducer.js";
const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const formStyle = {
    textAlign:'center',
  }

  const buttonStyle={
    marginTop: '5px'
  }
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      blogsService.setToken(user.token);
      authorService.setToken(user.token)
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
    } catch {
      dispatch(setNotification("Wrong credentials", "error", 5000));
    }
  };

  return (
    <div class="container">
      <form style={formStyle} onSubmit={handleLogin}>
        <h2>Log in to application</h2>
        <div class="row">
          <div class="col-25">
            <label for="fusername">Username:</label>
          </div>
          <div class="col-75">
            <input
              data-testid="username"
              type="text"
              value={username}
              name="Username"
              id="fusername"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="fpassword">Password:</label>
          </div>
          <div class="col-75">
            <input
              data-testid="password"
              type="text"
              value={password}
              name="Password"
              id="fpassword"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
        </div>
        <button style={buttonStyle}type="submit" value="Login">Login</button>
      </form>
    </div>
  );
};
export default Login;
