import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';

import { OK, UNAUTHORIZED } from '../../constants/statusCode';
import { COLOR_RED, EMPTY_LOGIN_ERROR, LOGIN_LENGTH_ERROR, EMPTY_PASSWORD_ERROR, PASSWORD_LENGTH_ERROR, EMPTY_EMAIL_ERROR, INVALID_EMAIL_ERROR} from '../../constants/infoText';
import MyFetch from '../../utils/myFetch';

import MyInput from '../input';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function SignupForm(props) {
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
    const request = await MyFetch('/user/signup', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    switch (request.status) {
      case OK:
        const response = await request.json();
        sessionStorage.token = JSON.stringify(response.token);
        setMessage({
          status: '',
          text: '',
        });
        Modal.success({
          content: `an email: ${values.email} was sent to confirm the registration`,
        });
        break;

      case UNAUTHORIZED:
        setMessage({
          status: COLOR_RED,
          text: `login: ${values.login} is already exists`,
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
      name="registration"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <MyInput
        label="Login"
        name="login"
        message={{ status: message.status }}
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
      <Form.Item
        name="email"
        label="E-mail"
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
      </Form.Item>
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
