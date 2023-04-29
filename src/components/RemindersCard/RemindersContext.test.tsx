import { fireEvent, render, screen } from "@testing-library/react";
import AddReminder from "./AddReminder";
import React from "react";
import { Button, Card, DatePicker, Form, Input } from "antd";
import ReminderItem from "./ReminderItem";
import { Divider } from "antd/lib";
import { ReminderDataProps } from "./RemindersCard";

const mockedRemindersData: ReminderDataProps[] = [
  {
    dueDateTime: "01/06/2023",
    title: "Task 1",
    description: "Finish a book"
  },
  {
    dueDateTime: "01/05/2023",
    title: "Task 2",
    description: "Feed Linux"
  }
];


describe("RemindersContext", () => {
  test("should call saveNewReminder when click on submit button", () => {
    const mockedSaveNewReminder = jest.fn();
    render(
      <Card title="Your Reminders" className="w-1/2 m-auto">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="submit" onClick={mockedSaveNewReminder}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        {
          mockedRemindersData.map((reminder: ReminderDataProps) => <>
            <ReminderItem dueDateTime={reminder.dueDateTime} description={reminder.description}
                          title={reminder.title} />
            <Divider />
          </>)
        }
      </Card>
    );
    const submitNewReminderButton = screen.getByText("Submit");
    fireEvent.click(submitNewReminderButton);
    expect(mockedSaveNewReminder).toHaveBeenCalledTimes(1);
  });
});