import { Avatar, Divider } from "antd";
import React from "react";
import { useJwt } from "react-jwt";


export type UserHeaderProps = {
  isStudent: boolean;
  username: string;
  firstname: string;
  lastname: string;
  isHovered: boolean;
  avatar?: string;
};

function UserHeader({
  username,
  firstname,
  lastname,
  isStudent,
  isHovered,
  avatar,
}: UserHeaderProps) {
  const { decodedToken }: any = useJwt(localStorage.getItem("token") as string);

  return (
    <div>
      <div className={"flex w-full justify-center gap-3"}>
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
          size={48}
          data-testid={"user-avatar"}
        />
        <div className={"text-center font-bold"}>
          <div className={`${isStudent && isHovered && decodedToken?.role !== "STUDENT" && "text-blue-500"}`}>
            {(firstname || "John") + " " + (lastname || "Doe")}
          </div>
          <div className="text-gray-500">@{username}</div>
        </div>
      </div>
      <Divider />
    </div>
  );
}

export default UserHeader;
