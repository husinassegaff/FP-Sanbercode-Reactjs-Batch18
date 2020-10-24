import React from 'react';
// import Routes from "./Materi-15/Routes"
import {UserProvider} from "./context/UserContext"
import './App.css';

function App() {
  return (
    <>
      <UserProvider>
        <Routes/>
      </UserProvider>
    </>
  );
}

export default App;