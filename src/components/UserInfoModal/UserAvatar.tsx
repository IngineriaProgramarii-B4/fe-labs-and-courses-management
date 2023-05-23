import { Avatar } from "antd";
import React from "react";

type UserAvatarProps = {
  avatar?: string;
  onClick: () => void;
};

function UserAvatar({ avatar, onClick }: UserAvatarProps) {
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
      size={40}
      onClick={onClick}
      data-testid={"user-avatar"}
    />
  );
}

export default UserAvatar;
