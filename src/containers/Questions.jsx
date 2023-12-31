import React, { useState } from 'react';
import {
  Form, Radio, Checkbox, Button, Select, Input, Card
} from 'antd';
import { useSelector } from 'react-redux';
import Textfield from '../shared/TextField';
import { QUESTION_ADDED, QUESTION_REQUIRED } from '../constants/messages';
import { PostData } from '../API/api';
import Notification from '../components/Notification';

function Questions() {
  const [form] = Form.useForm();
  const [answerType, setAnswerType] = useState('check');
  const [type, setQuestionType] = useState('');
  const [newOption, setNewOption] = useState();
  const [answersArray, setAnswerArray] = useState([]);
  const { user } = useSelector((state) => state.user);

  const handleSubmit = async (values) => {
    console.log(values);
    const createdBy = user.id;
    if (typeof values.Options === 'string') {
      answersArray.push(values.Options);
    }
    const question = {
      ...values,
      answersArray,
      type,
      answerType,
      createdBy,
    };
    const response = await PostData('questions/', question);
    const data = await response.json();
    if (data.message !== 'Invalid Body') {
      Notification(true, QUESTION_ADDED);
    } else {
      Notification(false, QUESTION_REQUIRED);
    }
    form.resetFields();
    setAnswerArray([]);
  };
  const handleChange = (value) => {
    setAnswerType(value);
  };
  const changeHandler = (event) => {
    setNewOption(event.target.value);
  };
  const handleQuestionChange = (value) => {
    setQuestionType(value);
  };
  const addOption = () => {
    setAnswerArray([...answersArray, newOption]);
    setNewOption('');
  };

  let Options;
  if (answerType === 'boolean') {
    Options = answersArray.map((option) => (
      <Radio className="block h-[30px]" key={answersArray.indexOf(option)} value={option}>
        {option}
      </Radio>
    ));
  } else if (answerType === 'options') {
    Options = answersArray.map((option) => (
      <Checkbox key={answersArray.indexOf(option)} className="ml-2 h-[30px]" value={option}>
        {option}
      </Checkbox>
    ));
  } else {
    Options = answersArray.map((option) => (
      <Select.Option className="ml-2 h-[30px]" key={answersArray.indexOf(option)} value={option}>
        {option}
      </Select.Option>
    ));
  }

  return (
    <div className="py-10 m-auto w-1/2 rounded-md p-5 space-y-10">
      <h1 className="text-[#008080] text-3xl">Create Questions</h1>
      <Form form={form} onFinish={handleSubmit}>
        <Card title="Question Type" className="max-w-xl mx-auto">
          <Form.Item rules={[{ required: true }]}>
            <Select
              className="mb-5 w-max"
              defaultValue=""
              onChange={handleQuestionChange}
            >
              <Select.Option value="mock">Mock</Select.Option>
              <Select.Option value="codereview">Code Review</Select.Option>
              <Select.Option value="one">One on One</Select.Option>
              <Select.Option value="annual">Annual Review</Select.Option>
              <Select.Option value="biannual">Biannual Review</Select.Option>
              <Select.Option value="quarterly">Quarterly Review</Select.Option>
            </Select>
          </Form.Item>
        </Card>
        <Card title="Question" className="max-w-xl mx-auto">
          <Textfield
            name="text"
            placeholder="Question"
            rules={[{ required: true, message: QUESTION_REQUIRED }]}
            type="text"
          />
        </Card>
        <Card title="Answer Type" className="max-w-xl mx-auto">
          <Form.Item rules={[{ required: true }]}>
            <Select
              className="mb-5 w-max"
              defaultValue=""
              onChange={handleChange}
            >
              <Select.Option value="options">Checkbox</Select.Option>
              <Select.Option value="boolean">Radio Button</Select.Option>
              <Select.Option value="numeric">Select</Select.Option>
              <Select.Option value="string">Text</Select.Option>
            </Select>
          </Form.Item>
          {answerType === 'boolean' && (
          <Form.Item className="text-left" name="Options" label="Options">
            <Radio.Group>{Options}</Radio.Group>
          </Form.Item>
          )}
          {answerType === 'options' && (
          <Form.Item className="text-left" name="Options" label="Options">
            <Checkbox.Group className="flex-col">{Options}</Checkbox.Group>
          </Form.Item>
          )}
          {answerType === 'numeric' && (
          <Form.Item className="text-left" name="Options" label="Options">
            <Select
              className="mb-5 w-max"
            >
              {Options}
            </Select>
          </Form.Item>
          )}
        </Card>
        {answerType !== 'string' && (
          <Card title="Add a Option" className="max-w-xl mx-auto">
            <Input.Group compact>
              <Input
                style={{ width: '70%' }}
                value={newOption}
                onChange={changeHandler}
                placeholder="Add Option"
              />
              <Button
                style={{ width: '20%' }}
                onClick={addOption}
                className="ml-5 text-white
                border-[#008080] bg-[#008080] hover:bg-[#20B2AA]
                hover:!text-white hover:!border-[#20B2AA]"
              >
                Add

              </Button>
            </Input.Group>
          </Card>
        )}
        <Form.Item>
          <Button
            htmlType="submit"
            className="mt-2 login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20B2AA] hover:!text-white hover:!border-[#20B2AA]"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Questions;
