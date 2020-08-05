import React from 'react'
import {Form} from 'antd';

export default function Input(props) {
  const {label, name, placeholder, rules, message} = props;

    return (
      <Form.Item
        label={label}
        name={name}
        placeholder={placeholder}
        rules={rules}
        {...props.message.status && {
          validateStatus: message.status, 
          help: message.text
        }
      }
      >
       {props.children}
      </Form.Item>
    );
}
