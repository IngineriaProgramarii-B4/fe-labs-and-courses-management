import { Divider } from "antd";
import React from "react"

export type UserHeaderProps = {
  username: string;
  firstname: string;
  lastname: string;
}

function UserHeader({ username, firstname, lastname } : UserHeaderProps) {
  return (
    <div style={{ textAlign: "center", fontWeight: "bold" }}>
      <div>{firstname + " " + lastname}</div>
      <div>@{username}</div>
      <Divider />
    </div>
  );
}
export default UserHeader;
