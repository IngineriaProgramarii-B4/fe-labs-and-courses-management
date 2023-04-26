import React, { useState } from "react";
import { ReminderDataProps } from "./RemindersCard";
import { Input, Space } from "antd";

export default function ReminderItem({ dueDateTime, title, description }: ReminderDataProps) {

  const [newDescription, setNewDescription] = useState(description);
  const [newDueDate, setNewDueDate] = useState(dueDateTime);
  const [editableDescription, setEditableDescription] = useState(false);
  const [editableDueDate, setEditableDueDate] = useState(false);

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <h1 className="font-semibold text-base">{title}</h1>
      <div>
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
            className={!editableDescription ? "fa-solid fa-pencil ml-2 cursor-pointer" : "fa-solid fa-check ml-2 cursor-pointer"}
            onClick={() => setEditableDescription(!editableDescription)}
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
            className={!editableDueDate ? "fa-solid fa-pencil ml-2 cursor-pointer" : "fa-solid fa-check ml-2 cursor-pointer"}
            onClick={() => setEditableDueDate(!editableDueDate)}
          />
        </div>
      </div>
    </Space>
  );
}