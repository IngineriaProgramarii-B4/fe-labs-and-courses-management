import React, { useContext } from "react";
import { Card } from "antd";
import ReminderItem from "./ReminderItem";
import AddReminder from "./AddReminder";
import { Divider } from "antd/lib";
import { RemindersContext } from "./RemindersContext";

export type ReminderDataProps = {
  dueDateTime: string;
  title: string;
  description: string;
}

export function RemindersCardBody({ reminders }: {reminders: ReminderDataProps[]}) {
  return (
    <Card title="Your Reminders" className="w-1/2 m-auto">
      <AddReminder />
      {
        reminders.map((reminder : ReminderDataProps) => <>
          <ReminderItem dueDateTime={reminder.dueDateTime} description={reminder.description}
                        title={reminder.title} />
          <Divider />
        </>)
      }
    </Card>
  );
}

export default function RemindersCard() {
  // @ts-ignore
  const { reminders } = useContext(RemindersContext);
  return <RemindersCardBody reminders={reminders} />
}

