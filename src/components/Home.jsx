import { useEffect, useRef } from "react";
import Login from "./Login.jsx";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "../reducers/blogReducer.js";
import { initializeAuthors } from "../reducers/authorsReducer.js";
import blogService from "../services/blogs";
import authorService from "../services/authors";
import { setUser } from "../reducers/userReducer.js";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");

    if (loggedUserJSON) {
      const curr_user = JSON.parse(loggedUserJSON);
      dispatch(setUser(curr_user));
      blogService.setToken(curr_user.token);
      authorService.setToken(curr_user.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(initializeAuthors())
      dispatch(initializeBlogs());
    }
  }, [user]);

  return (
    <div>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <Login/>
        </div>
      ):(
        <div>
          <h2>blog app</h2>
        </div>
      )}
    </div>
  );
};

export default Home;
