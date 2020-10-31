import React, { useContext } from "react"
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Menu } from 'antd';

const Navbar =() =>{
  const [user, setUser] = useContext(UserContext)
  const handleLogout = () =>{
    setUser(null)
    localStorage.removeItem("user")
  }
  
  return(    
    <header>

      <Menu mode="horizontal">
        <Menu.Item>
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Item>
          { user === null && <Link to="/login">Login</Link> }
        </Menu.Item>

        <Menu.Item>
          { user === null && <Link to="/register">Register</Link> }
        </Menu.Item>

        <Menu.Item>
          { user && <Link to="/movies">Movie List Editor</Link> }
        </Menu.Item>

        <Menu.Item>
          { user && <a style={{cursor: "pointer"}} onClick={handleLogout}>Logout</a> }
        </Menu.Item>
       
      </Menu>
    </header>
  )
};

export default Navbar
