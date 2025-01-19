import Authors from "./Authors.jsx";
import Blogs from "./Blogs.jsx";
import Blog from "./Blog.jsx";
import Author from "./Author.jsx";
import Notification from "./Notification.jsx";
import Home from "./Home.jsx";
import '../index.css';
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

  const menuStyle = {
    justifyContent:'center', 
    display: 'flex', 
    background:'#bcbcbc', 
    padding:'5px',
    alignItems:'center'
  }

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
        <div style={menuStyle}>
            <Link style={padding} to="/"><strong>Home</strong></Link>
            { user !== null && (
              <div style={{display:'flex', alignItems: 'center'}}>
                <Link style={padding} to="/blogs/"><strong>Blogs</strong></Link>
                <Link style={padding} to="/users/"><strong>Users</strong></Link>
                <div style={{border:'solid', borderWidth:'1px', display:'flex', alignItems: 'center',padding:'3px'}}>
                  <p style={{margin:'0px 5px 0px 0px'}}>{user.name}</p> 
                  <button onClick={logout}>logout</button>
                </div>
              </div>
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