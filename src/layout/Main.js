import React from "react"
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from 'antd';
import Navbar from "./Navbar"
import Section from "./Section"
import Copyright from "./Copyright"

const { Header, Footer, Content } = Layout;

const Main = () =>{
  return(
    <>
      <Router>
        <Layout>
          <Header><Navbar/></Header>
          <Content><Section/></Content>
          <Footer> <Copyright/></Footer>
        </Layout>        
      </Router>
    </>
  )
}

export default Main
