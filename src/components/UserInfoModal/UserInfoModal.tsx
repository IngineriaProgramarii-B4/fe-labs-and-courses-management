import React, { useContext, useEffect, useState } from "react";
import { Button, Divider, Modal, Space, Spin, Tooltip, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import UserAvatar from "./UserAvatar";
import UserInfoInput from "./UserInfoInput";
import { UserContext } from "../UserContext/UserContext";
import { v4 } from "uuid";

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
            className={"fa-solid fa-pen-to-square ml-2 cursor-pointer"}
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
  avatar?: string;
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
        <Upload
          showUploadList={false}
          onChange={() => setNewAvatar("")}
          data-testid={"user-profile-update"}
        >
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
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  registrationNumber?: string;
  year?: number;
  semester?: number;
  type: number;
};

const getDefaultUserData = () => {
  const userData: UserDataType = {
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    type: -1,
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
  const [loggedUser, setLoggedUser] = useState<string>("");

  // @ts-ignore
  const { setIsUserModified } = useContext(UserContext);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8090/api/v1",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  useEffect(() => {
    setNewUsername(userData.username);
    setNewEmail(userData.email);
  }, [userData]);

  const onAvatarClick = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    axiosInstance
      .post("/users/loggedUser", token)
      .then((res) => res.data)
      .then((data) => {
        setLoggedUser(data.username);
      })
      .then(() => {
        axiosInstance
          .get(`/users?username=${loggedUser}`)
          .then((res) => res.data)
          .then((data) => {
            setUserData(data[0]);
            setIsLoading(false);
          });
      })
      .catch((err) => toast.error(err.message));

    setIsModalOpen(true);
  };
  const onSave = () => {
    setIsUserModified(true);
    setIsEditing(false);

    const { email, username, ...sentUser } = userData;
    const newUser = { ...sentUser, email: newEmail, username: newUsername };

    let endPoint = "";

    if (userData.type === 0) {
      endPoint += "/admin";
    } else if (userData.type === 1) {
      endPoint += "/teacher";
    } else if (userData.type === 2) {
      endPoint += "/student";
    }
    endPoint += `/${newUser.id}`;

    axiosInstance.patch(endPoint, newUser).catch((err) => console.error(err));

    toast.success("User profile updated");
  };

  const onCancel = () => {
    setIsUserModified(false);
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
                <React.Fragment key={v4()}>
                  {key !== "username" && key !== "email" && key !== "id" ? (
                    <UserInfoInput
                      title={key}
                      value={`${val}`}
                      type={"text"}
                      isEditing={isEditing}
                    />
                  ) : key !== "id" ? (
                    <UserInfoInput
                      title={key}
                      value={key === "username" ? newUsername : newEmail}
                      type={"text"}
                      isEditing={isEditing}
                      setValue={
                        key === "username" ? setNewUsername : setNewEmail
                      }
                    />
                  ) : null}
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
