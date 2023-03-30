import React, { useState } from "react";
import {Avatar, Input, Modal, Space} from "antd";

type UserInfoInputProps = {
  title: string,
  type: string,
  value: string,
  setValue: (val: string) => void
}

function UserInfoInput({title, type, value, setValue}: UserInfoInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className={"flex"}>
      <p className={"my-auto"}>{title}:</p>
      {!isEditing ?
        <div className={"flex"} onClick={() => setIsEditing(true)}>
          <p className={"my-auto ml-2"}>{value}</p>
          <i className={"fa-solid fa-pencil"}/>
        </div>
        :
        <div>
          <Input
            type={type}
            className={"ml-2 w-[13rem]"}
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <i className={"fa-solid fa-check"} onClick={() => setIsEditing(false)}/>
        </div>
      }
    </div>
  )
}

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

  return (
    <div className={`${className} cursor-pointer`}>
      <Avatar icon={<i className={"fa-solid fa-user"}/>} shape={"square"} size={32} onClick={() => setIsModalOpen(true)}/>
      <Modal
        title={"User Profile"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose={true}
        footer={null}
      >
        <Space direction="vertical" size="middle" className={'d-flex px-[1rem] py-[2rem] w-full'}>
          <UserInfoInput title={"First name"} value={firstName} setValue={() => {}} type={'text'} />
          <UserInfoInput title={"Last name"} value={lastName} setValue={() => {}} type={'text'} />
          <UserInfoInput title={"Username"} value={username} setValue={() => {}} type={'text'} />
          <UserInfoInput title={"Email"} value={email} setValue={() => {}} type={'email'} />
        </Space>
      </Modal>
    </div>
  );
}

export default UserInfoModal;
