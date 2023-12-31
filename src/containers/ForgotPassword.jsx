import React from 'react';
import {
  LockOutlined, MailOutlined
} from '@ant-design/icons';
import {
  Button, Form
} from 'antd';
import { Link } from 'react-router-dom';
import Textfield from '../shared/TextField';
import {
  VALID_EMAIL_PROMPT,
  PASSWORD_REQUIRED_PROMPT,
  MIN_PASSWORD_PROMPT,
  STRONG_PASSWORD_PROMPT,
  PASSWORD_DO_NOT_MATCH_PROMPT,
  EMAIL_DOES_NOT_EXIST,
  PASSWORD_UPDATED
} from '../constants/messages';
import { PASSWORD_PATTERN } from '../constants/pattern';
import { ForgotPasswordApi } from '../API/api';
import Notification from '../components/Notification';

function ForgotPassword() {
  const onFinish = async (values) => {
    const response = await ForgotPasswordApi('users/forgotpassword', values);
    const data = await response.json();
    if (data.user === EMAIL_DOES_NOT_EXIST) {
      Notification(false, EMAIL_DOES_NOT_EXIST);
    } else {
      Notification(true, PASSWORD_UPDATED);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto w-1/4 border-2 rounded-md p-5 space-y-10 bg-white">
        <h1 className="text-[#008080] text-3xl">Reset Password</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Textfield
            name="email"
            type="email"
            labelText="Email"
            placeholder="Enter your email"
            prefix={<MailOutlined className="site-form-item-icon" />}
            rules={[
              {
                required: true,
                message: VALID_EMAIL_PROMPT
              }
            ]}
          />
          <Textfield
            name="password"
            type="password"
            labelText="Password"
            placeholder="Enter your password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            rules={[
              { required: true, message: PASSWORD_REQUIRED_PROMPT },
              { min: 8, message: MIN_PASSWORD_PROMPT },
              {
                pattern: PASSWORD_PATTERN,
                message: STRONG_PASSWORD_PROMPT
              }
            ]}
          />
          <Textfield
            name="Confirm Password"
            type="password"
            labelText="Confirm Password"
            placeholder="Enter your confirm password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            rules={[
              { required: true, message: PASSWORD_REQUIRED_PROMPT },
              { min: 8, message: MIN_PASSWORD_PROMPT },
              {
                pattern: PASSWORD_PATTERN,
                message: STRONG_PASSWORD_PROMPT
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(PASSWORD_DO_NOT_MATCH_PROMPT));
                },
              }),
            ]}
          />
          <Form.Item>
            <div className="flex justify-between">
              <Button htmlType="submit" className="w-2/3 login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20B2AA] hover:!text-white hover:!border-[#20B2AA]">
                Reset Password
              </Button>
              <Link to="/" className="text-[#008080] hover:text-[#20b2aa]">Login Now!</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
