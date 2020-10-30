import React, { useContext, useState, useEffect } from "react"
import {UserContext} from "../context/UserContext"
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from "axios"

const formItemLayout = {
  labelCol: {
    xs: { span: 0 },
    sm: { span: 16 },
  },
  wrapperCol: {
    xs: { span: 32 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 16,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 10,
    },
  },
};

const NormalLoginForm = () =>{
  const[form] = Form.useForm()
  const[, forceUpdate] = useState()
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({email: "" , password: ""})

  useEffect(() => {
    forceUpdate({});
  }, []);
  

  const onFinish = values => {
      console.log('Received values of form: ', values);
  };

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
      <div style={{margin: "0 auto", width: "60%", padding: "50px"}}>
        <h1>Login Form</h1>
        <Form 
          {...formItemLayout}
          form={form} 
          name="normal_login"
          classname="login-form" 
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onSubmit={handleSubmit}
        >
          
          <Form.Item
            name="email"
            label={
              <span>
                Email&nbsp;
              </span>
            }
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
          <Input prefix={<UserOutlined className="site-form-item-icon"/>} type="email" name="email" onChange={handleChange} value={input.email}/>
          <br/>
          </Form.Item>
    
          <Form.Item
            name="password"
            label={
              <span>
                Password&nbsp;
              </span>
            }
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input prefix={<LockOutlined className="site-form-item-icon"/>} type="password" name="password" onChange={handleChange} value={input.password}/>
            <br/>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password?
            </a>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Login 
            </Button>
                Or <a href="/register">register now!</a>
          </Form.Item>
        
        </Form>
      </div>
    </>
  )
}

export default NormalLoginForm