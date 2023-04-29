import React, { useContext } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import {RemindersContext} from "./RemindersContext";

export default function AddReminder() {
  // @ts-ignore
  const {title, setTitle, description, setDescription, date, setDate, saveNewReminder} = useContext(RemindersContext)

  return (
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Type a title!" }]}
        >
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Type a description!" }]}
        >
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>


        <Form.Item
          label="Due date"
          name="date"
          rules={[{ required: false, message: "Select a date!" }]}
        >
          <DatePicker value={date} format="DD.MM.YYYY HH:MM" onChange={(date, dateString) => {
            setDate(dateString);
          }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType="submit" onClick={saveNewReminder}>
            Submit
          </Button>
        </Form.Item>
      </Form>
  );
}