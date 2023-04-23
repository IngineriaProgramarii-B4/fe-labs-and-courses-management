import { useEffect, useState } from "react";
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
import axios from "axios"

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
      <p className={"my-auto w-[8.5rem] text-end"}>{title}:</p>
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
  type: number;
};

const getDefaultUserData = () => {
  const userData: UserDataType = {
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
  const [newAvatar, setNewAvatar] = useState(avatar);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
  })

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

    axiosInstance.get("/users?username=stefan.ciobaca")
      .then((res) => res.data)
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

    let endPoint = "";

    if (userData.type === 0) {
      endPoint += "/admin";
    } else if (userData.type === 1) {
      endPoint += "/teacher";
    } else if (userData.type === 2) {
      endPoint += "/student";
    }

    axiosInstance.put(endPoint, newUser)
      .then(res => console.log(res))
      .catch(err => console.error(err))

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
              {Object.entries(userData).map(([key, val]) =>
                key !== "username" && key !== "email" && key !== "id" ? (
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
                    setValue={key === "username" ? setNewUsername : setNewEmail}
                  />
                ) : (
                  ""
                )
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
