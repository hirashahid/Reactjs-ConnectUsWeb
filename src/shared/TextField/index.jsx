import { Form, Input } from 'antd';
import React from 'react';

function Textfield({
  prefix, name, rules, type, labelText, placeholder, defaultValue
}) {
  return (
    <Form.Item name={name} rules={rules}>
      <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
        {labelText}
        <Input
          type={type}
          prefix={prefix}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      </label>
    </Form.Item>
  );
}

export default Textfield;
