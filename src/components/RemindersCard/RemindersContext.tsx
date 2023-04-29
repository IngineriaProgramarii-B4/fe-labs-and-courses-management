import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { ReminderDataProps } from "./RemindersCard";

export const RemindersContext = createContext({});

// @ts-ignore
export default function RemindersContextProvider({ children }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [reminders, setReminders] = useState<ReminderDataProps[]>([]);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8090/api/v1",
    headers: { "Content-Type": "application/json" }
  });

  useEffect(() => {
    axiosInstance.get("/reminders/loggeduser") // TODO: get the reminders of the actual connected user
      .then((res: { data: ReminderDataProps[]; }) => res.data)
      .then((data: ReminderDataProps[]) => setReminders(data))
      .catch((err: any) => console.error(err));

    // DUMMY DATA
    const REMINDERS = [
      {
        id: "111",
        idUser: "sdf134323",
        dueDate: "01/06/2023",
        title: "Task 1",
        description: "Finish a book"
      },
      {
        id: "221",
        idUser: "sdfr4323",
        dueDate: "01/05/2023",
        title: "Task 2",
        description: "Feed Linux"
      }
    ];
    // setReminders(REMINDERS);

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
      .catch((err) => console.log(err));
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
        axiosInstance
      }}>
      {children}
    </RemindersContext.Provider>
  );
}