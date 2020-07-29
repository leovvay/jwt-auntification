import React, { useRef } from 'react';

import { Button, Form, Input } from 'antd';
import './App.css';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function App() {
  const refLogin = useRef(null);
  const refPassword = useRef(null);


  const onFinish = values => {
    console.log('Success:', values);
    fetch('http://localhost:8080', {
		method: 'GET'
	}).then((response) => {
		console.log(response);
	})
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="App">
      <main className="App-header">
        <p>Введите логин и пароль</p>
        <Form {...layout} 
        name="basic" 
        initialValues={{ remember: true }} 
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Login"
            name="login"
            placeholder="login"
           
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input  ref={refLogin} />
          </Form.Item >
          <Form.Item
            label="Password"
            name="password"
            placeholder="password"
            
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password ref={refPassword}/>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </main>
    </div>
  );
}

export default App;
