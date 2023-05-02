import React, { useContext, useState } from "react";
import { Form, Input, Button, DatePicker, ConfigProvider } from "antd";
import { RemindersContext } from "./RemindersContext";
import { Modal } from "antd";

type voidFn = () => void

export function ModalFooter({ saveNewReminder, onCancel }: { saveNewReminder: voidFn, onCancel: voidFn }) {
  return (
    <>
      <Button onClick={onCancel}>
        Cancel
      </Button>
      <ConfigProvider theme={
        {
          token: {
            colorPrimary: "green"
          }
        }
      }>
        <Button onClick={() => {
          saveNewReminder();
          onCancel();
        }}>
          Add
        </Button>
      </ConfigProvider>
    </>
  );
}

export default function AddReminderModal({
                                           isModalAddReminderOpen,
                                           setIsModalAddReminderOpen
                                         }: { isModalAddReminderOpen: boolean, setIsModalAddReminderOpen: (val: boolean) => void }) {
  // @ts-ignore
  const { title, setTitle, description, setDescription, date, setDate, saveNewReminder } = useContext(RemindersContext);
  return (
    <Modal
      centered={true}
      title="Add Reminder"
      open={isModalAddReminderOpen}
      onCancel={() => {
        setIsModalAddReminderOpen(false);
      }}
      destroyOnClose={true}
      footer={
        <ModalFooter
          saveNewReminder={saveNewReminder}
          onCancel={() => setIsModalAddReminderOpen(false)}
        />
      }>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400 }}
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
      </Form>
    </Modal>
  );
}
