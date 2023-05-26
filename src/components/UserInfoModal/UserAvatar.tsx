import { Avatar } from "antd";
import React, { useEffect } from "react";
import axios from "axios";
import mockedAvatar from "../../mockedData/mockedAvatar.jpg";

type UserAvatarProps = {
  avatar?: string;
  onClick: () => void;
  setAvatar: (val: string) => void;
};

function UserAvatar({ avatar, onClick, setAvatar }: UserAvatarProps) {

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8082/api/v1",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  useEffect(() => {
    axiosInstance
      .post("/users/loggedUser", localStorage.getItem("token"))
      .then((res) => res.data)
      .then((data) => {
        return data.email;
      })
      .then((email) => {
        axiosInstance
          .get(`/users?email=${email}`)
          .then((res) => res.data)
          .then((data) => {
            return data[0];
          }).then(res => {
          axios.get(`http://localhost:8082/api/v1/profile/download/${res.id}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            responseType: "arraybuffer"
          })
            .then(res=> {
              const imgBlob = new Blob([res.data], { type: 'png' });
              const imgUrl = URL.createObjectURL(imgBlob);
              setAvatar(imgUrl ? imgUrl : mockedAvatar);
            })
            .catch(err => {
              if(err.response.status === 404) {

              }
            })
          ;
        });

      });

  }, [])

  return (
    <Avatar
      icon={
        avatar ? (
          <img src={avatar} alt={"Avatar"} />
        ) : (
          <i
            className={"fa-solid fa-user"}
            data-testid={"user-placeholder-avatar"}
          />
        )
      }
      shape={"square"}
      size={44}
      onClick={onClick}
      data-testid={"user-avatar"}
    />
  );
}

export default UserAvatar;
