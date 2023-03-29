import React, { useState } from "react";
import styles from "./UserInfoModal.module.scss";
import { Button, Modal } from "antd";

type UserInfoModalProps = {
  userType: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  // registrationNumber: number,
  // year: number,
  // semester: number,
  // exampleString: string,
  // exampleObject: {
  //   val1: string,
  //   val2: boolean
  // }
};

function UserInfoModal({
  userType,
  lastName,
  firstName,
  username,
  email,
}: UserInfoModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button onClick={showModal}>Open Modal</Button>
      <Modal
        title="Information"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label>
          First Name:
          <input type="text" defaultValue={firstName} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" defaultValue={lastName} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" defaultValue={username} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" defaultValue={email} />
        </label>
        <br />
      </Modal>
    </>
  );
}

export default UserInfoModal;
