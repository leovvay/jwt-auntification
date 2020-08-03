import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function signupForm({ setUserName }) {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isCorrect, setIsCorrect] = useState(true);
  let status, message;

  const onFinish = async (values) => {
    let request;
    try {
      request = await fetch('/user/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return  console.log('fetch error',  error);
    }
    if (request.status === 200) {
      const answer = await request.json();
      if (answer) {
        localStorage.userData = JSON.stringify(answer);
      }
      if (answer.user) {
        setUserName(answer.user.login);
        setIsCorrect(true);
      }
    } else if (request.status === 401) {
      setIsCorrect(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  
  if (isCorrect) {
    status ='';
    message = '';
  }  else {
    status = 'error'
    message = 'wrong login / password'
  }

  return (
    <Form
      {...layout}
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Login"
        name="login"
        validateStatus={status}
        placeholder="login"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        placeholder="password"
        validateStatus={status}
        help={message}
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}


