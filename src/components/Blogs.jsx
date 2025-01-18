import {Link} from 'react-router-dom'
import Home from './Home.jsx';
import { useSelector } from 'react-redux';
import BlogForm from "./BlogForm.jsx";
import Togglable from "./Togglable.jsx";
import { useRef } from 'react';

const Blogs = () =>{
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel="create new" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  );

  const blogs = useSelector((state) => state.blogs);
  return (
    <div>
      <Home />
      {blogForm()}
      <div data-testid="blog-list">
            {blogs !== null ? (
              [...blogs]
              .sort((ob1, ob2) => ob2.likes - ob1.likes)
                .map((blog) =><div style={blogStyle} key={blog.id}> <Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>)
            ) : (
              <p>no data</p>
            )}
      </div>
    </div>
  )
}

export default Blogs