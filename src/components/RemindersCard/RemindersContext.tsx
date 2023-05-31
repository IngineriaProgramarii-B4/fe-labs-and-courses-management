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
                                                   children
                                                 }: {
  children: JSX.Element | JSX.Element[];
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [reminders, setReminders] = useState<ReminderDataProps[]>([]);
  const [loggedUser, setLoggedUser] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8082/api/v1",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  const getData = () => {
    console.log(localStorage.getItem("token"));
    axiosInstance
      .post("/users/loggedUser", localStorage.getItem("token"))
      .then((res) => {
        setLoggedUser(res.data.username);
        setUserId(res.data.id);
        console.log(res.data.id);
        return res.data.id;
      })
      .then((id) => {
        console.log(id);
        axiosInstance
          .get(`/reminders/${id}`)
          .then((res) => {
            setReminders(res.status === 404 ? [] : res.data);
          })
          .catch(err => {
            if (err.response.status === 404)
              setReminders([]);
          });
      })
      .catch(err => setReminders([]));
  };

  useEffect(() => {
    // @ts-ignore
    getData();
  }, []);

  const saveNewReminder = () => {
    axiosInstance
      .post("/reminders", {
        title,
        description,
        dueDateTime: date,
        //creatorUsername: loggedUser,
        creatorId: userId
      })
      .then(() => {
        getData();
      })
      .catch((err) => console.log(err));
  };

  const deleteReminder = (reminderId: string) => {
    axiosInstance
      .delete(`/reminders/${reminderId}`)
      .then((res) => {
        toast.success("Reminder deleted");
        getData();
      });
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
      getData
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
      getData
    ]
  );

  return (
    <RemindersContext.Provider value={value}>
      {children}
    </RemindersContext.Provider>
  );
}
