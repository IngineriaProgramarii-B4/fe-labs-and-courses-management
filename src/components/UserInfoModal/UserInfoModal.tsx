import React, { useContext, useEffect, useState } from "react";
import { Button, Divider, Modal, Space, Spin, Tooltip, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import UserAvatar from "./UserAvatar";
import UserInfoInput from "./UserInfoInput";
import { UserContext } from "../UserContext/UserContext";
import { v4 } from "uuid";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";
import mockedAvatar from "../../mockedData/mockedAvatar.jpg";
import { useJwt } from "react-jwt";

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
            onClick={
              () => setIsEditing(true)
            }
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
                              onLogout, // <-- Change this line
                              onCancel,
                              onSave
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
  setAvatar: (val: string) => void;
  id: string;
};

export function UserProfileAvatar({
                                    isEditing,
                                    avatar,
                                    newAvatar,
                                    setNewAvatar,
                                    setAvatar,
                                    id
                                  }: UserProfileAvatarProps) {


  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };


  const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setNewAvatar(url);
        setAvatar(url);
      });
    }
  };

  function beforeUpload(file: File) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      console.error("You can only upload JPG/PNG file!");
    } else {
      const newFileName = id + file.name.substring(file.name.indexOf("."));
      const modifiedFile = new File([file], newFileName, { type: file.type });
      return Promise.resolve(modifiedFile);
    }
  }

  return (
    <div
      className={
        "flex justify-center items-center w-[10rem] h-[10rem] mx-auto border-2 border-dotted rounded-2xl overflow-hidden"
      }
    >
      {isEditing || !avatar ? (
        <Upload
          action={`http://localhost:8082/api/v1/profile/upload/${id}`}
          headers={{ Authorization: `Bearer ${localStorage.getItem("token")}` }}
          showUploadList={false}
          onChange={handleChange}
          beforeUpload={beforeUpload}
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
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  password: string;
  roles: Array<{ id: number; name: string }>;
  id: string;
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
    createdAt: "",
    updatedAt: "",
    isDeleted: false,
    password: "string",
    roles: [],
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: ""
  };
  return userData;
};

type UserInfoModalProps = {
  avatar?: string;
  className?: string;
};

const filteredFields = [
  { backend: "firstname", frontend: "First Name" },
  { backend: "lastname", frontend: "Last Name" },
  { backend: "email", frontend: "Email" },
  { backend: "username", frontend: "Username", isEditable: true },
  { backend: "registrationNumber", frontend: "Registration Number" },
  { backend: "office", frontend: "Office" },
  { backend: "title", frontend: "Title" }
];

function UserInfoModal({ className }: UserInfoModalProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState<UserDataType>(getDefaultUserData());
  const [newUsername, setNewUsername] = useState(userData.username);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [newAvatar, setNewAvatar] = useState<string | null>(null);

  const { decodedToken }: any = useJwt(localStorage.getItem("token") as string);

  // @ts-ignore
  const { setIsUserModified } = useContext(UserContext);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8082/api/v1",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  const logout = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    setNewUsername(userData.username);
  }, [userData]);

  const onAvatarClick = () => {
    setIsLoading(true);
    const email = decodedToken?.sub;
    axiosInstance
      .get(`/users?email=${email}`)
      .then((res) => res.data)
      .then((data) => {
        setUserData(data[0]);
        setIsLoading(false);
        return data[0];
      }).then(res => {
      axios.get(`http://localhost:8082/api/v1/profile/download/${res.id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        responseType: "arraybuffer"
      })
        .then(res => {
          const imgBlob = new Blob([res.data], { type: "png" });
          const imgUrl = URL.createObjectURL(imgBlob);
          setAvatar(imgUrl ? imgUrl : mockedAvatar);
        }).catch(err => {
        if (err.response.status === 404) {

        }
      });
    });


    setIsModalOpen(true);
  };
  const onSave = () => {
    setIsUserModified(true);
    setIsEditing(false);

    const { email, username, ...sentUser } = userData;
    const newUser = { ...sentUser, username: newUsername };

    let endPoint = "";

    if (userData.roles[0].id === 1) {
      endPoint += "/admin";
    } else if (userData.roles[0].id === 2) {
      endPoint += "/teacher";
    } else if (userData.roles[0].id === 3) {
      endPoint += "/student";
    }
    endPoint += `/${newUser.id}`;

    axiosInstance.patch(endPoint, newUser)
      .catch(err => {
        console.error(err);
      });
    toast.success("User profile updated");
  };

  const onCancel = () => {
    setIsUserModified(false);
    setIsEditing(false);
    setNewUsername(userData.username);
  };

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={`${className} cursor-pointer`}>
      <UserAvatar
        avatar={avatar ? avatar : mockedAvatar}
        onClick={onAvatarClick}
        setAvatar={setAvatar}
      />
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
            avatar={avatar ? avatar : mockedAvatar}
            newAvatar={newAvatar}
            setAvatar={setAvatar}
            setNewAvatar={setNewAvatar}
            id={userData.id}
          />
          <Divider dashed />
          {!isLoading ? (
            <Space direction="vertical" size={2} className={"flex w-full"}>
              {Object.entries(userData).map(([key, val], i) => {
                if (
                  !filteredFields.find((field) => field.backend === key) ||
                  val === null
                ) {
                  return null;
                }
                const fieldData = filteredFields.find(
                  (field) => field.backend === key
                );
                return (
                  <React.Fragment key={v4()}>
                    {!fieldData?.isEditable ? (
                      <UserInfoInput
                        title={fieldData?.frontend || "Title"}
                        value={`${val}`}
                        type={"text"}
                        isEditing={isEditing}
                      />
                    ) : (
                      <UserInfoInput
                        title={fieldData?.frontend || "Title"}
                        value={newUsername}
                        type={"text"}
                        isEditing={isEditing}
                        setValue={setNewUsername}
                      />
                    )}
                  </React.Fragment>
                );
              })}
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
