import { useState } from "react";
import { useDispatch } from "react-redux";
import { addLike, removeBlog } from "../reducers/blogReducer";
import { useSelector } from "react-redux";
const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.user);

  const showWhenVisible = { display: visible ? "" : "none" };
  const showIfSameUser = {
    display: user.userId === blog.user.id ? "" : "none",
  };
  const buttonLabel = visible ? "hide" : "view";
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const updateBLog = async (event) => {
    event.preventDefault();
    dispatch(addLike({ ...blog, likes: blog.likes + 1 }));
  };

  const deleteBlog = async (event) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author} ?`)) {
      event.preventDefault();
      dispatch(removeBlog(blog));
    }
  };
  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{buttonLabel}</button>
      <div style={showWhenVisible} className="extraInfo">
        {blog.url}
        <div>
          likes {blog.likes} <button onClick={updateBLog}>like</button>{" "}
        </div>
        {blog.user.username}
        <div>
          <button style={showIfSameUser} onClick={deleteBlog}>
            remove
          </button>
        </div>
      </div>
    </div>
  );
};
export default Blog;
