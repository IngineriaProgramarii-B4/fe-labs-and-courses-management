import { useEffect, useState } from "react";
import { Button, Divider, Modal, Space, Spin, Tooltip, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";
import UserAvatar from "./UserAvatar";
import UserInfoInput from "./UserInfoInput";

type ModalTitleProps = {
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
};

export function ModalTitle({ isEditing, setIsEditing }: ModalTitleProps) {
  return (
    <span>
      User Profile
      {!isEditing && (
        <Tooltip title={"Edit user"}>
          <i
            className={"fa-solid fa-pencil ml-2 cursor-pointer"}
            onClick={() => setIsEditing(true)}
            data-testid={"pencil-icon"}
          />
        </Tooltip>
      )}
    </span>
  );
}

type ModalFooterProps = {
  isEditing: boolean;
  onLogout: () => void;
  onCancel: () => void;
  onSave: () => void;
};

export function ModalFooter({
  isEditing,
  onLogout,
  onCancel,
  onSave,
}: ModalFooterProps) {
  if (isEditing) {
    return (
      <>
        <Button children={"Cancel"} type="link" onClick={onCancel} danger />
        <Button
          children={"Save"}
          onClick={onSave}
          className={
            "border-green-600 text-green-600 hover:!border-green-500 hover:!text-green-500"
          }
        />
      </>
    );
  }
  return <Button children={"Logout"} onClick={onLogout} danger />;
}

type UserProfileAvatarProps = {
  isEditing: boolean;
  avatar: string | undefined;
  newAvatar: string | null;
  setNewAvatar: (val: string) => void;
};

export function UserProfileAvatar({
  isEditing,
  avatar,
  newAvatar,
  setNewAvatar,
}: UserProfileAvatarProps) {
  return (
    <div
      className={
        "flex justify-center items-center w-[10rem] h-[10rem] mx-auto border-2 border-dotted rounded-2xl overflow-hidden"
      }
    >
      {isEditing || !avatar ? (
        <Upload showUploadList={false} onChange={() => setNewAvatar("")}>
          {newAvatar ? (
            <img src={newAvatar} alt="avatar" className={"object-cover"} />
          ) : (
            <div className={"flex flex-col justify-center items-center"}>
              <i className={"fas fa-plus font-s text-3xl"} />
              <div className={"mt-2"}>Upload avatar</div>
            </div>
          )}
        </Upload>
      ) : (
        <img src={avatar} alt="avatar" className={"object-cover"} />
      )}
    </div>
  );
}

type UserDataType = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  registrationNumber?: string;
  year?: number;
  semester?: number;
};

const getDefaultUserData = () => {
  const userData: UserDataType = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  };
  return userData;
};

type UserInfoModalProps = {
  avatar?: string;
  className?: string;
};

function UserInfoModal({ avatar, className }: UserInfoModalProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState<UserDataType>(getDefaultUserData());
  const [newUsername, setNewUsername] = useState(userData.username);
  const [newEmail, setNewEmail] = useState(userData.email);
  const [newAvatar, setNewAvatar] = useState<string | null>(null);

  useEffect(() => {
    setNewUsername(userData.username);
    setNewEmail(userData.email);
  }, [userData]);

  const onAvatarClick = () => {
    setIsLoading(true);
    //mocking request data
    fetch("http://localhost:8080/api/v1/users?username=florin02")
      .then((res) => res.json())
      .then((data) => {
        setUserData(data[0]);
      });
    setTimeout(() => setIsLoading(false), 1000);
    setIsModalOpen(true);
  };

  const onSave = () => {
    setIsEditing(false);

    const { email, username, ...sentUser } = userData;
    const newUser = { ...sentUser, email: newEmail, username: newUsername };

    fetch("http://localhost:8080/api/v1/updated/student", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    toast.success("User profile updated");
  };

  const onCancel = () => {
    setIsEditing(false);
    setNewUsername(userData.username);
    setNewEmail(userData.email);
    setNewAvatar(null);
  };

  const onLogout = () => {
    //ToDo: logic for logging out
    navigate("/login");
  };

  return (
    <div className={`${className} cursor-pointer`}>
      <UserAvatar avatar={avatar} onClick={onAvatarClick} />
      <Modal
        title={<ModalTitle isEditing={isEditing} setIsEditing={setIsEditing} />}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          onCancel();
        }}
        destroyOnClose={true}
        footer={
          <ModalFooter
            isEditing={isEditing}
            onSave={onSave}
            onCancel={onCancel}
            onLogout={onLogout}
          />
        }
      >
        <div className={"w-full h-full px-[1rem] py-[1.5rem]"}>
          <UserProfileAvatar
            isEditing={isEditing}
            avatar={avatar}
            newAvatar={newAvatar}
            setNewAvatar={setNewAvatar}
          />
          <Divider dashed />
          {!isLoading ? (
            <Space direction="vertical" size={2} className={"flex w-full"}>
              {Object.entries(userData).map(([key, val], i) => (
                <React.Fragment key={i}>
                  {key !== "username" && key !== "email" ? (
                    <UserInfoInput
                      title={key}
                      value={`${val}`}
                      type={"text"}
                      isEditing={isEditing}
                    />
                  ) : (
                    <UserInfoInput
                      title={key}
                      value={key === "username" ? newUsername : newEmail}
                      type={"text"}
                      isEditing={isEditing}
                      setValue={
                        key === "username" ? setNewUsername : setNewEmail
                      }
                    />
                  )}
                </React.Fragment>
              ))}
            </Space>
          ) : (
            <Spin tip="Loading..." className={"w-full my-5"} />
          )}
        </div>
      </Modal>
    </div>
  );
}

export default UserInfoModal;
