import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';

import { OK, UNAUTHORIZED, FORBIDDEN } from '../../constants/statusCode';
import { COLOR_RED, WRONG_LOGIN_OR_PASSWORD, CHECK_EMAIL, EMPTY_LOGIN_ERROR, LOGIN_LENGTH_ERROR, EMPTY_PASSWORD_ERROR, PASSWORD_LENGTH_ERROR } from '../../constants/infoText';
import MyFetch from '../../utils/myFetch';

import MyInput from '../input';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


export default function LoginForm({ changeLogin, thisModal }) {
  const [form] = Form.useForm()
  const [message, setMessage] = useState({
    status: '',
    text: '',
  });

  function inputHandler() {
    setMessage({
      status: '',
      text: '',
    });
  }

  const onFinish = async (values) => {
    const request = await MyFetch('/user/login', { method: 'POST', body: JSON.stringify(values) });

    switch (request.status) {
      case OK:
        const response = await request.json();
        if (response) {
          sessionStorage.token = response.token;
          if (response.user) {
            changeLogin(response.user.login);
            setMessage({ status: '', text: '' });
            if (thisModal) {
              thisModal.destroyAll();
            }
          }
        }
        break;
      case UNAUTHORIZED:
        setMessage({ status: COLOR_RED, text: WRONG_LOGIN_OR_PASSWORD });
        break;
      case FORBIDDEN:
        setMessage({
          status: COLOR_RED,
          text: CHECK_EMAIL,
        });
        break;

      default:
        break;
    }
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
        message={{ status: message.status }}
        placeholder="login"
        rules={[{ required: true, message: EMPTY_LOGIN_ERROR }, 
        {
          pattern: /^[a-z0-9_-]{3,16}$/i,
          message: LOGIN_LENGTH_ERROR,
        },]}
      >
        <Input onInput={inputHandler} />
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
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
