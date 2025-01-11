import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog.jsx";
import Login from "./components/Login.jsx";
import Notification from "./components/Notification.jsx";
import BlogForm from "./components/BlogForm.jsx";
import Togglable from "./components/Togglable.jsx";
import blogService from "./services/blogs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer.js";
import { setUser } from "./reducers/userReducer.js";
const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const curr_user = JSON.parse(loggedUserJSON);
      dispatch(setUser(curr_user));
      blogService.setToken(curr_user.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
    }
  }, [user]);

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  );

  return (
    <div>
      <Notification />
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <Login setUser={setUser} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged-in</p>
          {blogForm()}
        </div>
      )}
      <div data-testid="blog-list">
        {blogs !== null ? (
          [...blogs]
            .sort((ob1, ob2) => ob2.likes - ob1.likes)
            .map((blog) => <Blog key={blog.id} blog={blog} />)
        ) : (
          <p>no data</p>
        )}
      </div>
    </div>
  );
};

export default App;
