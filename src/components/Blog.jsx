import { useState } from "react";
import { addLike, removeBlog, addComment } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import {  useMatch} from 'react-router-dom'
import Home from "./Home";
import { v4 as uuidv4 } from 'uuid';

const Blog = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const [comment, setComment] = useState("");
  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : undefined

  const showIfSameUser = (blog && user) ?{
    display: user.userId === blog.user.id ? "" : "none",
  }: "none";

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

  const handleComment = async (event) =>{
    event.preventDefault()
    dispatch(addComment({comment, id:blog.id}));
  }
  return (
    <div>
      <Home />
        {
          blog !== undefined ? ( 
          <div className="blog">
            <div>
              {blog.title} {blog.author}
            </div>
            <div>
              {blog.url}
            </div>
            <div>
              {blog.likes} likes <button onClick={updateBLog}>like</button>{" "}
            </div>
            {blog.user.username}
            <div>
              <h3>comments</h3>
              <form onSubmit={handleComment}>
                <div>
                  <input
                    data-testid="comment"
                    type="text"
                    value={comment}
                    name="Comment"
                    onChange={({ target }) => setComment(target.value)}
                  />
                  <button type="submit">add comment</button>
                </div>
              </form>
              <ul>
                {
                  [...blog.comments].map(comment =><li key={uuidv4()}>{comment}</li>)
                }
              </ul>
              {/* <button style={showIfSameUser} onClick={deleteBlog}>
                remove
              </button> */}
            </div>
          </div>
          ):(
            <>
              No data
            </>
          )}
    </div>
  );
};
export default Blog;
