import Authors from "./Authors.jsx";
import Blogs from "./Blogs.jsx";
import Blog from "./Blog.jsx";
import Author from "./Author.jsx";
import Notification from "./Notification.jsx";
import Home from "./Home.jsx";

import { useNavigate } from "react-router";
import { logoutUser } from "../reducers/userReducer.js";
import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();

    const padding = {
      paddingRight: 5
    }

    const logout = () =>{
      window.localStorage.clear();
      dispatch(logoutUser())
      navigate("/")
    }
    return (
      <div>
        <div style={{ display: 'flex', background:'#bcbcbc', paddingBlock:'5px'}}>
            <Link style={padding} to="/">home</Link>
            <Link style={padding} to="/blogs/">blogs</Link>
            <Link style={padding} to="/users/">users</Link>
            { user !== null && (
                <>
                  {user.name} logged-in
                  <button onClick={logout}>logout</button>
                </>
            )}

        </div>
        <Notification />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs/" element={<Blogs />} />
            <Route path="/users/" element={<Authors/>} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users/:id" element={<Author/>} />
        </Routes>
      </div>
    )
  }

export default Menu