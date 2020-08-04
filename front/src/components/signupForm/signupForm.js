
import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';

import { OK, UNAUTHORIZED } from '../../constants/statusCode';
import {COLOR_RED} from '../../constants/infoText'
import MyFetch from '../../utils/MyFetch';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


export default function SignupForm(props) {
  const [isAlreadyExists, setIsAlreadyExists] = useState(false);
  let status, message;

  const onFinish = async (values) => {
    const request = await MyFetch('/user/signup', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    switch (request.status) {
      case OK:
        const response = await request.json();
        sessionStorage.token = JSON.stringify(response.token);
        setIsAlreadyExists(false);
        Modal.success({
          content: `an email: ${values.email} was sent to confirm the registration`,
        });
        break;

      case UNAUTHORIZED:
        setIsAlreadyExists(values.login);
        break;
      default:
        break;
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (isAlreadyExists) {
    status = COLOR_RED;
    message = `login: ${isAlreadyExists} is already exists`;
  } else {
    status = '';
    message = '';
  }

  return (
    <Form
      {...layout}
      name="register"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Login"
        name="login"
        validateStatus={status}
        help={message}
        placeholder="login"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
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
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        placeholder="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}
