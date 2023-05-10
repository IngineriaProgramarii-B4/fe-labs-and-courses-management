import React, { useState, createContext, useEffect, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const RemindersContext = createContext({});
export type ReminderDataProps = {
  id: string;
  dueDateTime: string;
  title: string;
  description: string;
};

export default function RemindersContextProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [reminders, setReminders] = useState<ReminderDataProps[]>([]);
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8090/api/v1",
    headers: { "Content-Type": "application/json" },
  });

  console.log(reminders);
  const getData = () => {
    axiosInstance
      .get("/reminders/loggeduser") // TODO: get the reminders of the actual connected user
      .then((res) => res.data)
      .then((data) => {
        setReminders(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const saveNewReminder = () => {
    axiosInstance
      .post("/reminders", {
        title,
        description,
        dueDateTime: date,
        creatorUsername: "loggeduser", //TODO: change the username to the current logged user
      })
      .then(() => {
        getData();
      })
      .catch((err) => console.error(err));
  };

  const deleteReminder = (reminderId: string) => {
    // TODO delete the reminder
    axiosInstance
      .delete(`/reminders/${reminderId}`)
      .then((res) => {
        toast.success("Reminder deleted");
        getData();
      })
      .catch((err) => console.error(err));
  };

  const value = useMemo(
    () => ({
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
      getData,
    }),
    [
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
      getData,
    ]
  );

  return (
    <RemindersContext.Provider value={value}>
      {children}
    </RemindersContext.Provider>
  );
}
