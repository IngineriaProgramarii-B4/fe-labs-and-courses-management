import React, { useContext, useState } from "react";
import { Card } from "antd";
import ReminderItem from "./ReminderItem";
import AddReminderModal from "./AddReminderModal";
import { Divider } from "antd/lib";
import { RemindersContext, ReminderDataProps } from "./RemindersContext";

const uuid = require("uuid");

export function RemindersCardBody({reminders} : {reminders : ReminderDataProps[]}) {
  const [isModalAddReminderOpen, setIsModalAddReminderOpen] = useState<boolean>(false);
  return (
    <div className="w-1/1 mt-8">
      <AddReminderModal isModalAddReminderOpen={isModalAddReminderOpen} setIsModalAddReminderOpen={setIsModalAddReminderOpen} />
      <div className="w-2/3 m-auto">
        <button onClick={() => setIsModalAddReminderOpen(true)}
                className="w-8 h-8 mb-1 font-bold text-white bg-green-600 rounded hover:bg-green-500">+
        </button>
        <Card title="Your Reminders">
          {
            reminders.map((reminder: ReminderDataProps) => <>
              <ReminderItem dueDateTime={reminder.dueDateTime} description={reminder.description}
                            title={reminder.title} reminderId={reminder.reminderId} key={uuid.v4()} />
              <Divider key={uuid.v4()} />
            </>)
          }
        </Card>
      </div>
    </div>
  )
}

export default function RemindersCard() {
  // @ts-ignore
  const { reminders } = useContext(RemindersContext);
  // @ts-ignore
  return (
    <RemindersCardBody reminders={reminders}/>
  )
}

