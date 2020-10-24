import React, { useContext, useState, useEffect } from "react"
import {UserContext} from "../context/UserContext"
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from "axios"

const HorizontalLoginForm = () =>{
  const[form] = Form.useForm()
  const[, forceUpdate] = useState()
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({email: "" , password: ""})

  useEffect(() => {
    forceUpdate({});
  }, []);
  
  const handleSubmit = (event) =>{
    event.preventDefault()
    axios.post("https://backendexample.sanbersy.com/api/user-login", {
      email: input.email, 
      password: input.password
    }).then(
      (res)=>{
        var user = res.data.user
        var token = res.data.token
        var currentUser = {name: user.name, email: user.email, token }
        setUser(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser))
      }
    ).catch((err)=>{
      alert(err)
    })
  }

  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
      case "email":{
        setInput({...input, email: value})
        break;
      }
      case "password":{
        setInput({...input, password: value})
        break;
      }
      default:{break;}
    }
  }

  return(
    <>
      <div style={{margin: "0 auto", width: "25%", padding: "50px"}}>
        <Form form={form} name="horizontal_login" layout = "inline" onSubmit={handleSubmit}>
          <label>Email: </label>
          <Input prefix={<UserOutlined className="site-form-item-icon"/>} type="email" name="email" onChange={handleChange} value={input.email}/>
          <br/>
          <label>Password: </label>
          <Input prefix={<LockOutlined className="site-form-item-icon"/>} type="password" name="password" onChange={handleChange} value={input.password}/>
          <br/>
          <Button
          type="primary"
          htmlType="submit"
          disabled={
            !form.isFieldsTouched(true) || form.getFieldsError().filter(({errors})=> errors.length).length
          }>Login</Button>
        </Form>
      </div>
    </>
  )
}

export default HorizontalLoginForm