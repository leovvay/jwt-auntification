import React from 'react';
import { Button, Form, Input } from 'antd';

import {EMPTY_LOGIN_ERROR, LOGIN_LENGTH_ERROR, EMPTY_PASSWORD_ERROR, PASSWORD_LENGTH_ERROR, EMPTY_EMAIL_ERROR, INVALID_EMAIL_ERROR} from '../../constants/infoText';

import actionSignup from '../../actions/signup';
import actionChangeMessage from '../../actions/changeInputError';

import MyInput from '../input';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function SignupForm({ inputErrorMessage: message }) {

  function inputHandler() {
    if (message?.text) {
      actionChangeMessage({
        status: '',
        text: '',
      });
    }
  }

  const onFinish = async (values) => {
    actionSignup(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="registration"
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
        <Input onInput={inputHandler} />
      </MyInput>
      <MyInput
        name="email"
        label="E-mail"
        message={{ status: message?.status }}
        rules={[
          {
            type: 'email',
            message: INVALID_EMAIL_ERROR,
          },
          {
            required: true,
            message: EMPTY_EMAIL_ERROR,
          },
        ]}
      >
        <Input />
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
        <Input.Password onInput={inputHandler}/>
      </MyInput>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}
