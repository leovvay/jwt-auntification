import React from 'react';
import { Button, Form, Input } from 'antd';

import {PASSWORD_REG_EXP, LOGIN_REG_EXP} from '../../constants/regExp'
import {
  EMPTY_LOGIN_ERROR,
  LOGIN_LENGTH_ERROR,
  EMPTY_PASSWORD_ERROR,
  PASSWORD_LENGTH_ERROR,
  EMPTY_EMAIL_ERROR,
  INVALID_EMAIL_ERROR,
} from '../../constants/infoText';

import MyInput from '../input';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function SignupForm(props) {
  const { inputErrorMessage: message, signupFetch, changeInputMessage } = props;
  function inputHandler() {
    if (message?.text) {
      changeInputMessage({});
    }
  }

  const onFinish = async (values) => {
    signupFetch(values);
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
            pattern: LOGIN_REG_EXP,
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
            pattern: PASSWORD_REG_EXP,
            message: PASSWORD_LENGTH_ERROR,
          },
          { required: true, message: EMPTY_PASSWORD_ERROR },
        ]}
      >
        <Input.Password onInput={inputHandler} />
      </MyInput>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}
