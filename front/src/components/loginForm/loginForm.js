import React from 'react';
import { Button, Form, Input } from 'antd';

import { PASSWORD_REG_EXP, LOGIN_REG_EXP } from '../../constants/regExp';
import {
  EMPTY_LOGIN_ERROR,
  LOGIN_LENGTH_ERROR,
  EMPTY_PASSWORD_ERROR,
  PASSWORD_LENGTH_ERROR,
} from '../../constants/infoText';

import MyInput from '../input';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function LoginForm(props) {
  const { inputErrorMessage: message, loginFetch, changeInputMessage } = props;
  const [form] = Form.useForm();

  function inputHandler() {
    if (message?.text) {
      changeInputMessage({});
    }
  }

  const onFinish = async (values) => {
    loginFetch(values);
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
            pattern: LOGIN_REG_EXP,
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
            pattern: PASSWORD_REG_EXP,
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
