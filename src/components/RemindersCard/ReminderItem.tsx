import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function ReminderItem({
                                       dueDateTime,
                                       title,
                                       description,
                                       id,
                                       deleteReminder
                                     }: any) {
  const [newDescription, setNewDescription] = useState(description);
  const [newDueDate, setNewDueDate] = useState(dueDateTime);
  const [editableDescription, setEditableDescription] = useState(false);
  const [editableDueDate, setEditableDueDate] = useState(false);
  const [isModalDeleteReminderOpen, setIsModalDeleteReminderOpen] =
    useState(false);

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
            <Button
              onClick={() => {
                setIsModalDeleteReminderOpen(false);
              }}
              data-testid="cancel-delete-icon"
            >
              Cancel
            </Button>

            <Button
              danger
              onClick={() => {
                setIsModalDeleteReminderOpen(false);
                deleteReminder();
              }}
            >
              Ok
            </Button>
          </>
        }
      />
      <div className="flex flex-row items-center">
        <h1 className="font-semibold text-base">{title}</h1>
        <FontAwesomeIcon
          data-testid="delete-reminder-icon"
          icon={faTrash}
          className="cursor-pointer ml-auto hover:text-red-500"
          onClick={() => {
            setIsModalDeleteReminderOpen(true);
          }}
        />
      </div>
      <div className="flex-col">
        <div>
          <span className="text-gray-500">description: </span>
          {!editableDescription ? (
            <span> {newDescription} </span>
          ) : (
            <Input
              data-testid="edit-desc-input"
              className={"ml-2 w-[13rem] fill-black"}
              value={newDescription}
              onChange={(e) => {
                setNewDescription(e.target.value);
              }}
            />
          )}
          <i
            data-testid="edit-description-icon"
            className={
              !editableDescription
                ? "fa-solid fa-pen-to-square ml-2 cursor-pointer hover:text-blue-500"
                : "fa-solid fa-check ml-2 cursor-pointer hover:text-blue-500"
            }
            onClick={() => {
              setEditableDescription(!editableDescription);
              if (editableDescription) toast.success("Reminder updated!");
            }}
          />
        </div>
        <div>
          <span className="text-gray-500">due date: </span>
          {!editableDueDate ? (
            <span> {newDueDate} </span>
          ) : (
            <Input
              data-testid="edit-date-input"
              className={"ml-2 w-[13rem] fill-black"}
              value={newDueDate}
              onChange={(e) => {
                setNewDueDate(e.target.value);
              }}
            />
          )}
          <i
            data-testid="edit-date-icon"
            className={
              !editableDueDate
                ? "fa-solid fa-pen-to-square ml-2 cursor-pointer hover:text-blue-500"
                : "fa-solid fa-check ml-2 cursor-pointer hover:text-blue-500"
            }
            onClick={() => {
              setEditableDueDate(!editableDueDate);
              if (editableDueDate) toast.success("Reminder updated!");
            }}
          />
        </div>
      </div>
    </>
  );
}
