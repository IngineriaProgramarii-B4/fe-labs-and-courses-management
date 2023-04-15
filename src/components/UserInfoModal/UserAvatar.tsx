import { Avatar } from "antd";
import React from "react";

type UserAvatarProps = {
  avatar?: string;
  avatarClickHandler: () => void;
};

function UserAvatar({ avatar, avatarClickHandler }: UserAvatarProps) {
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
      size={32}
      onClick={avatarClickHandler}
      data-testid={"user-avatar"}
    />
  );
}

export default UserAvatar;
