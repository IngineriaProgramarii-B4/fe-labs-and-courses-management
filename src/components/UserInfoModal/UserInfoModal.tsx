import React, { useState } from "react";
import {Avatar, Modal, Space} from "antd";

type UserInfoModalProps = {
  userType: 'admin' | 'student' | 'teacher',
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  className?: string
  registrationNumber?: number,
  year?: number,
  semester?: number,
};

function UserInfoModal({
  userType,
  lastName,
  firstName,
  username,
  email,
  className
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
    <div className={`${className}`}>
      <Avatar icon={<i className={"fa-solid fa-user"} />} shape={"square"} size={32} onClick={showModal}/>
      <Modal
        title={"User Profile"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={null}
      >
        <Space direction="vertical" size="middle" className={'d-flex px-[1rem] py-[2rem]'}>
        <label>
          First Name:
          <input type="text" className={'ml-2'} defaultValue={firstName} />
        </label>
        <label>
          Last Name:
          <input type="text" className={'ml-2'} defaultValue={lastName} />
        </label>
        <label>
          Username:
          <input type="text" className={'ml-2'} defaultValue={username} />
        </label>
        <label>
          Email:
          <input type="email" className={'ml-2'} defaultValue={email} />
        </label>
        </Space>
      </Modal>
    </div>
  );
}

export default UserInfoModal;
