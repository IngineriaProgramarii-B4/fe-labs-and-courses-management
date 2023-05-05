import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Input } from "antd";

interface MyVerticallyCenteredModalProps {
  title: string;
  description: string;
  modalShow: boolean;
  setModalShow: (show: boolean) => void;
  setDescription: (description: string) => void;
  subject: any;
  isModified: boolean;
  setIsModified: (isModified: boolean) => void;
}

const MyVerticallyCenteredModal: React.FC<MyVerticallyCenteredModalProps> = (
  props
) => {
  const [inputDescription, setInputDescription] = useState(props.description);
  const [editing, setEditing] = useState(false);

  const handleOk = () => {
    props.setDescription(inputDescription);
    props.setModalShow(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      props.subject.description = inputDescription;
      const result = await axios.put(
        `http://localhost:8090/api/v1/subjects/subjectTitle=${props.subject.title}`,
        props.subject
      );
      props.setIsModified(props.isModified ? false : true);
      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      data-testid="course-modal"
      open={props.modalShow}
      onCancel={() => props.setModalShow(false)}
      centered
      footer={
        editing
          ? [
              <Button key="close" onClick={() => setEditing(false)}>
                Close
              </Button>,
              <Button
                data-testid="save-modal"
                key="save"
                type="default"
                onClick={handleSave}
              >
                Save
              </Button>,
            ]
          : [
              <Button
                data-testid="close-modal"
                key="close"
                onClick={() => props.setModalShow(false)}
              >
                Close
              </Button>,
              <Button
                data-testid="edit-modal"
                key="edit"
                type="default"
                onClick={handleEdit}
              >
                Edit
              </Button>,
            ]
      }
    >
      <h2 //className="modal-title"
        className="text-2xl font-bold"
      >
        {props.title}
      </h2>
      {editing ? (
        <Input.TextArea
          data-testid="input-description"
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
          placeholder="Enter description"
          autoSize={{ minRows: 4, maxRows: 8 }}
        />
      ) : (
        <p>{props.description}</p>
      )}
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
