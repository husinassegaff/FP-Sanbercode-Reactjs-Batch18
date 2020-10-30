import React, { useContext, useState } from "react"
import {UserContext} from "../context/UserContext"
import axios from "axios"
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

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



const Register = () =>{
  const [form] = Form.useForm();
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({name: "", email: "" , password: ""})

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  const handleSubmit = (event) =>{
    event.preventDefault()
    axios.post("https://backendexample.sanbersy.com/api/register", {
      name: input.name, 
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
      case "name":{
        setInput({...input, name: value})
        break;
      }
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
      <div style={{margin: "auto", width: "60%", padding: "50px"}}>
        <h1>Register Form</h1>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
          onSubmit={handleSubmit}
        >

          <Form.Item
            name="username"
            label={
              <span>
                Username&nbsp;
              </span>
            }
            rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
          >
            <Input type="text" name="name" onChange={handleChange} value={input.name} />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email:"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input type="email" name="email" onChange={handleChange} value={input.email} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password  type="password" name="password" onChange={handleChange} value={input.password}/>
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          
          <Form.Item
            name="t&c"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject('Should accept t&c'),
              },
            ]}
            {...tailFormItemLayout}
          >
          <Checkbox>I have read the <a href="">terms & conditions</a></Checkbox>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>

        </Form>
      </div>
    </>
  )
}

export default Register