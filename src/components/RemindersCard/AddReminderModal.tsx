import React, { useContext } from "react";
import { Form, Input, Button, DatePicker, ConfigProvider, Modal } from "antd";
import { RemindersContext } from "./RemindersContext";

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
            colorPrimary: "#277ff7"
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
  const { title, setTitle, description, setDescription, date, setDate, saveNewReminder }
    : {
    title: string,
    setTitle: (val: string) => void,
    description: string,
    setDescription: (val: string) => void,
    setDate: (val: string) => void,
    saveNewReminder: () => void,
  }
    = useContext(RemindersContext);

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
          <Input data-testid="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Type a description!" }]}
        >
          <Input data-testid="edit-desc" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>


        <Form.Item
          label="Due date"
          name="date"
          data-testid="edit-date-input"
          rules={[{ required: false, message: "Select a date!" }]}
        >
          <DatePicker data-testid="edit-date" value={date} format="DD.MM.YYYY HH:MM" onChange={(date, dateString) => {
            setDate(dateString);
          }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
