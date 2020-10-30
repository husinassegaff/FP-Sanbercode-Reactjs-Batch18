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
      {/* <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          { user && <li><Link to="/movies">Movie List Editor </Link></li> }
          { user === null && <li><Link to="/login">Login </Link></li> }
          { user === null && <li><Link to="/register">Register </Link></li> }
          { user && <li><a style={{cursor: "pointer"}} onClick={handleLogout}>Logout </a></li> }
        </ul>
      </nav> */}

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
