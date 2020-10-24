import React, { useContext } from "react"
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Layout, Menu} from 'antd';


const Header =() =>{
  const [user, setUser] = useContext(UserContext)
  const handleLogout = () =>{
    setUser(null)
    localStorage.removeItem("user")
  }

  // return(
  //   <Layout className="layout">
  //     <Header>
  //       <div className="logo" />
  //       <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
  //         <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
  //         { user && <Menu.Item key="2"><Link to="/movies">Movie List Editor</Link></Menu.Item> }
  //         { user === null && <Menu.Item key="3"><Link to="/login">Login</Link></Menu.Item> }
  //         { user === null && <Menu.Item key="4"><Link to="/register">Register</Link></Menu.Item> }
  //         { user && <Menu.Item key="5"><a style={{cursor: "pointer"}} onClick={handleLogout}>Logout</a></Menu.Item>}
  //       </Menu>
  //     </Header>
  //   </Layout>,
  //    mountNode,
  // )
  return(    
    <header>
      <img id="logo" src="/img/logo.png" width="200px" />
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          { user && <li><Link to="/movies">Movie List Editor </Link></li> }
          { user === null && <li><Link to="/login">Login </Link></li> }
          { user === null && <li><Link to="/register">Register </Link></li> }
          { user && <li><a style={{cursor: "pointer"}} onClick={handleLogout}>Logout </a></li> }
        </ul>
      </nav>
    </header>
  )
};

export default Header
