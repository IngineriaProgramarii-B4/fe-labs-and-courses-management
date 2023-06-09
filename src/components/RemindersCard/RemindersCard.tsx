import React, { useContext, useState } from "react";
import { Card } from "antd";
import ReminderItem from "./ReminderItem";
import AddReminderModal from "./AddReminderModal";
import { Divider } from "antd/lib";
import { RemindersContext, ReminderDataProps } from "./RemindersContext";
import { toast } from "react-toastify";
import axios from "axios";

export function RemindersCardBody({ reminders }: { reminders: ReminderDataProps[] }) {
  const [isModalAddReminderOpen, setIsModalAddReminderOpen] = useState<boolean>(false);
  //@ts-ignore
  const { getData } = useContext(RemindersContext);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8082/api/v1",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  const deleteReminder = (reminderId: string) => {
    axiosInstance.delete(`/reminders/${reminderId}`)
      .then((res) => {
        toast.success("Reminder deleted");
        getData();
      });
  };
  // @ts-ignore
  return (
    <div className="w-1/1 mt-8">
      <AddReminderModal isModalAddReminderOpen={isModalAddReminderOpen}
                        setIsModalAddReminderOpen={setIsModalAddReminderOpen} />
      <div className="w-2/3 m-auto">
        <button onClick={() => setIsModalAddReminderOpen(true)}
                className="w-8 h-8 mb-1 font-bold text-white bg-[#5588da] rounded hover:bg-[#277ff7]">+
        </button>
        <Card title="Your Reminders">
          {
            reminders?.map((reminder: ReminderDataProps) => (
                <React.Fragment key={reminder.id}>
                  <ReminderItem dueDateTime={reminder.dueDateTime} description={reminder.description}
                                title={reminder.title} id={reminder.id} deleteReminder={() => {
                    deleteReminder(reminder.id);
                  }} />
                  <Divider />
                </React.Fragment>
              )
            )
          }
        </Card>
      </div>
    </div>
  );
}

export default function RemindersCard() {
  // @ts-ignore
  const { reminders } = useContext(RemindersContext);
  // @ts-ignore
  return (
    <RemindersCardBody reminders={reminders} />
  );
}

