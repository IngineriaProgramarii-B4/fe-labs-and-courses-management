import { Divider } from "antd";
import React from "react"

type UserHeaderProps = {
  username: string;
  firstname: string;
  lastname: string;
}

export default function UserHeader({ username, firstname, lastname } : UserHeaderProps) {
  return (
    <div style={{ textAlign: "center", fontWeight: "bold" }}>
      <div>{firstname + " " + lastname}</div>
      <div>@{username}</div>
      <Divider />
    </div>
  );
}

export type {UserHeaderProps}