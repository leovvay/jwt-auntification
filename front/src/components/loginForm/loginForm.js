import React from 'react';
import { Button, Form, Input } from 'antd';

import {
  EMPTY_LOGIN_ERROR,
  LOGIN_LENGTH_ERROR,
  EMPTY_PASSWORD_ERROR,
  PASSWORD_LENGTH_ERROR,
} from '../../constants/infoText';

import actionLogin from '../../actions/login';
import actionChangeMessage from '../../actions/changeInputError';

import MyInput from '../input';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function LoginForm({ inputErrorMessage: message }) {
  const [form] = Form.useForm();

  function inputHandler() {
    if (message?.text) {
      actionChangeMessage({
        status: '',
        text: '',
      });
    }
  }

  const onFinish = async (values) => {
    actionLogin(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <MyInput
        label="Login"
        name="login"
        message={{ status: message?.status }}
        placeholder="login"
        rules={[
          { required: true, message: EMPTY_LOGIN_ERROR },
          {
            pattern: /^[a-z0-9_-]{3,16}$/i,
            message: LOGIN_LENGTH_ERROR,
          },
        ]}
      >
        <Input onChange={inputHandler} />
      </MyInput>
      <MyInput
        label="Password"
        name="password"
        placeholder="password"
        message={message}
        rules={[
          {
            pattern: new RegExp(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/),
            message: PASSWORD_LENGTH_ERROR,
          },
          { required: true, message: EMPTY_PASSWORD_ERROR },
        ]}
      >
        <Input.Password onChange={inputHandler} />
      </MyInput>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
