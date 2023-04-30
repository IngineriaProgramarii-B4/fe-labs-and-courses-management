import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const RemindersContext = createContext({});
export type ReminderDataProps = {
  reminderId: string;
  dueDateTime: string;
  title: string;
  description: string;
}

// @ts-ignore
export default function RemindersContextProvider({ children }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [reminders, setReminders] = useState<ReminderDataProps[]>([]);
  const [isModalDeleteReminderOpen, setIsModalDeleteReminderOpen] = useState<boolean>(false)
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8090/api/v1",
    headers: { "Content-Type": "application/json" }
  });
  useEffect(() => {
    axiosInstance.get("/reminders/loggeduser") // TODO: get the reminders of the actual connected user
      .then((res: { data: ReminderDataProps[]; }) => res.data)
      .then((data: ReminderDataProps[]) => setReminders(data))
      .catch((err: any) => console.error(err));
  }, []);

  const saveNewReminder = () => {
    axiosInstance.post("/reminder", {
      title,
      description,
      dueDateTime: date,
      creatorUsername: "loggeduser" //TODO: change the username to the current logged user
    })
      .then(() => {
        console.log("Resource updated");
        axiosInstance.get("/reminders/loggeduser") // TODO: get the reminders of the actual connected user
          .then(res => res.data)
          .then(data => setReminders(data))
          .catch(err => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  const deleteReminder = (reminderId : string) => {
    toast.success("Reminder deleted");

    // TODO delete the reminder
    // axiosInstance.delete(`/reminders/${reminderId}`)
    //   .then((res) => console.log(res))
    //   .catch(err => console.error(err))
  };

  return (
    <RemindersContext.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        date,
        setDate,
        saveNewReminder,
        reminders,
        setReminders,
        axiosInstance,
        deleteReminder,
        setIsModalDeleteReminderOpen,
        isModalDeleteReminderOpen
      }}>
      {children}
    </RemindersContext.Provider>
  );
}