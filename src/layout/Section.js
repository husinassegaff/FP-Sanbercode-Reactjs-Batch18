import React, {useContext} from "react"
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from "../pages/Home"
import Movies from "../pages/Movies"
import Login from "../pages/Login"
import Register from "../pages/Register"
import {UserContext} from "../context/UserContext"


const Section = () =>{

  const [user] = useContext(UserContext);

  const PrivateRoute = ({user, ...props }) => {
    if (user) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  const LoginRoute = ({user, ...props }) =>
  user ? <Redirect to="/" /> : <Route {...props} />;

  return(    
    <section >
      <Switch>
        <Route exact path="/" user={user} component={Home}/>
        <LoginRoute exact path="/login" user={user} component={Login}/>
        <Register exact path="/register" user={user} component={Login}/>
        <PrivateRoute exact path="/movies" user={user} component={Movies}/>
      </Switch>
    </section>
  )
}

export default Section
