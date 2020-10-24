import React from 'react';
import Routes from "./layout/Main"
import {UserProvider} from "./context/UserContext"
import './App.css';
import 'antd/dist/antd.css';

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