import React, { useContext, useState } from "react";
import { Button, Input, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { RemindersContext, ReminderDataProps } from "./RemindersContext";
import { toast } from "react-toastify";

export default function ReminderItem({ dueDateTime, title, description, reminderId }: ReminderDataProps) {
  const [newDescription, setNewDescription] = useState(description);
  const [newDueDate, setNewDueDate] = useState(dueDateTime);
  const [editableDescription, setEditableDescription] = useState(false);
  const [editableDueDate, setEditableDueDate] = useState(false);
  // @ts-ignore
  const { setIsModalDeleteReminderOpen, isModalDeleteReminderOpen, deleteReminder } = useContext(RemindersContext);

  return (
    <>
      <Modal
        centered={true}
        title="Are you sure you want to delete this reminder?"
        open={isModalDeleteReminderOpen}
        onCancel={() => {
          setIsModalDeleteReminderOpen(false);
        }}
        destroyOnClose={true}
        footer={
          <>
            <Button onClick={() => {
              setIsModalDeleteReminderOpen(false);
            }}>Cancel</Button>

            <Button danger onClick={() => {
              deleteReminder(reminderId);
              setIsModalDeleteReminderOpen(false);
            }}>Ok</Button>
          </>
        }
      />
      <div className="flex flex-row items-center">
        <h1 className="font-semibold text-base">{title}</h1>
        <FontAwesomeIcon icon={faTrash} className="cursor-pointer ml-auto hover:text-red-500"
                         onClick={() => {
                           setIsModalDeleteReminderOpen(true);
                         }} />
      </div>
      <div className="flex-col">
        <div>
          <span className="text-gray-500">description: </span>
          {
            !editableDescription ?
              <span>  {newDescription}  </span> :
              <Input
                className={"ml-2 w-[13rem] fill-black"}
                value={newDescription}
                onChange={(e) => {
                  setNewDescription(e.target.value);
                }} />
          }
          <i
            className={!editableDescription ? "fa-solid fa-pen-to-square ml-2 cursor-pointer hover:text-blue-500" : "fa-solid fa-check ml-2 cursor-pointer hover:text-blue-500"}
            onClick={() => {
              setEditableDescription(!editableDescription);
              if (editableDescription)
                toast.success("Reminder updated!");
            }}
          />
        </div>
        <div>
          <span className="text-gray-500">due date: </span>
          {
            !editableDueDate ?
              <span>  {newDueDate}  </span> :
              <Input
                className={"ml-2 w-[13rem] fill-black"}
                value={newDueDate}
                onChange={(e) => {
                  setNewDueDate(e.target.value);
                }} />
          }
          <i
            className={!editableDueDate ? "fa-solid fa-pen-to-square ml-2 cursor-pointer hover:text-blue-500" : "fa-solid fa-check ml-2 cursor-pointer hover:text-blue-500"}
            onClick={() => {
              setEditableDueDate(!editableDueDate);
              if (editableDueDate)
                toast.success("Reminder updated!");
            }}
          />
        </div>
      </div>
    </>
  );
}