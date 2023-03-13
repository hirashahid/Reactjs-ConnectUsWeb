/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button, Form, Input,
} from 'antd';

function ForgotPassword() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
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
          <Form.Item
            name="email"
            rules={[{
              type: 'email', required: true, message: 'Please enter your email',
            }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{
              type: 'password', required: true, message: 'Please enter new password',
            }]}
          >
            <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="New Password" />
          </Form.Item>
          <Form.Item
            name="confirm-password"
            rules={[{ required: true, message: 'Please enter confirm password' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="confirm-password"
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-between">
              <Button htmlType="submit" className="login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20b2aa] hover:text-white w-2/4">
                Reset Password
              </Button>
              <a href="#" className="text-[#008080] hover:text-[#20b2aa]">Login Now!</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
