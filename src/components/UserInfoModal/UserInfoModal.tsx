import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Input,
  Modal,
  Space,
  Spin,
  Tooltip,
  Upload,
} from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type UserInfoInputProps = {
  title: string;
  type: string;
  value: string;
  isEditing: boolean;
  setValue?: (val: string) => void;
};

function UserInfoInput({
  title,
  type,
  value,
  setValue,
  isEditing,
}: UserInfoInputProps) {
  const isInEditMode = !!(isEditing && setValue);

  return (
    <div className={"flex h-[2rem]"}>
      <p className={"my-auto w-[5.5rem] text-end"}>{title}:</p>
      {!isInEditMode ? (
        <p className={"my-auto ml-3"}>{value}</p>
      ) : (
        <div>
          <Input
            type={type}
            className={"ml-2 w-[13rem] fill-black"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
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

const getDefaultUserData = (userType: "admin" | "student" | "teacher") => {
  const userData: UserDataType = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  };
  if (userType === "student") {
    userData.registrationNumber = "";
    userData.semester = 0;
  }

  return userData;
};

type UserInfoModalProps = {
  userType: "admin" | "student" | "teacher";
  avatar?: string;
  className?: string;
};

function UserInfoModal({ userType, avatar, className }: UserInfoModalProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState<UserDataType>(
    getDefaultUserData(userType)
  );
  const [newUsername, setNewUsername] = useState(userData.username);
  const [newEmail, setNewEmail] = useState(userData.email);
  const [newAvatar, setNewAvatar] = useState(avatar);

  const uploadButton = (
    <div className={"flex flex-col justify-center items-center"}>
      <i className={"fas fa-plus font-s text-3xl"} />
      <div className={"mt-2"}>Upload avatar</div>
    </div>
  );

  useEffect(() => {
    setNewUsername(userData.username);
    setNewEmail(userData.email);
  }, [userData]);

  const avatarIconClickHandler = () => {
    setIsLoading(true);
    //mocking request data
    setUserData({
      firstName: "Olariu",
      lastName: "Florin",
      username: "olariuflorin",
      email: "olariuflorin@gmail.com",
      registrationNumber: "1234567890",
      semester: 3,
    });
    setTimeout(() => setIsLoading(false), 1000);
    setIsModalOpen(true);
  };

  const onSave = () => {
    setIsEditing(false);
    toast.success("User profile updated");
  };

  const onCancel = () => {
    setIsEditing(false);
    setNewUsername(userData.username);
    setNewEmail(userData.email);
    setNewAvatar(avatar);
  };

  const onLogout = () => {
    //ToDo: logic for logging out
    navigate("/login");
  };

  return (
    <div className={`${className} cursor-pointer`}>
      <Avatar
        icon={
          avatar ? (
            <img src={avatar} alt={"avatar"} />
          ) : (
            <i className={"fa-solid fa-user"} />
          )
        }
        shape={"square"}
        size={32}
        onClick={avatarIconClickHandler}
      />
      <Modal
        title={
          <span>
            User Profile
            {!isEditing && (
              <Tooltip title={"Edit user"}>
                <i
                  className={"fa-solid fa-pencil ml-2 cursor-pointer"}
                  onClick={() => setIsEditing(true)}
                />
              </Tooltip>
            )}
          </span>
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          onCancel();
        }}
        destroyOnClose={true}
        footer={
          isEditing ? (
            <>
              <Button children={"Cancel"} onClick={onCancel} danger />
              <Button children={"Save"} onClick={onSave} />
            </>
          ) : (
            <Button children={"Logout"} onClick={onLogout} danger />
          )
        }
      >
        <div className={"w-full h-full px-[1rem] py-[1.5rem]"}>
          <div
            className={
              "flex justify-center items-center w-[10rem] h-[10rem] mx-auto border-2 border-dotted rounded-2xl overflow-hidden"
            }
          >
            {isEditing || !avatar ? (
              <Upload>
                {/*{newAvatar ? (*/}
                {/*  <img*/}
                {/*    src={newAvatar}*/}
                {/*    alt="avatar"*/}
                {/*    className={"object-cover"}*/}
                {/*  />*/}
                {/*) : (*/}
                {uploadButton}
                {/*)}*/}
              </Upload>
            ) : (
              <img src={newAvatar} alt="avatar" className={"object-cover"} />
            )}
          </div>
          <Divider dashed />
          {!isLoading ? (
            <Space direction="vertical" size={2} className={"flex w-full"}>
              <UserInfoInput
                title={"First name"}
                value={userData.firstName}
                type={"text"}
                isEditing={isEditing}
              />
              <UserInfoInput
                title={"Last name"}
                value={userData.lastName}
                type={"text"}
                isEditing={isEditing}
              />
              <UserInfoInput
                title={"Username"}
                value={newUsername}
                setValue={setNewUsername}
                type={"text"}
                isEditing={isEditing}
              />
              <UserInfoInput
                title={"Email"}
                value={newEmail}
                setValue={setNewEmail}
                type={"email"}
                isEditing={isEditing}
              />
              {userType === "student" && (
                <>
                  {userData.registrationNumber && (
                    <UserInfoInput
                      title={"Registration"}
                      value={userData.registrationNumber}
                      type={"text"}
                      isEditing={isEditing}
                    />
                  )}
                  {userData.semester && (
                    <>
                      <UserInfoInput
                        title={"Year"}
                        value={Math.ceil(userData.semester / 2).toString()}
                        type={"text"}
                        isEditing={isEditing}
                      />
                      <UserInfoInput
                        title={"Semester"}
                        value={(((userData.semester + 1) % 2) + 1).toString()}
                        type={"text"}
                        isEditing={isEditing}
                      />
                    </>
                  )}
                </>
              )}
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
