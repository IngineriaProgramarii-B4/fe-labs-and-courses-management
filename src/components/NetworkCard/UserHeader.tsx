import { Divider } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export type UserHeaderProps = {
  id: string;
  type: number;
  username: string;
  firstname: string;
  lastname: string;
}

function UserHeader({ username, firstname, lastname, id, type }: UserHeaderProps) {
  return (
    <div style={{ textAlign: "center", fontWeight: "bold" }}>
      {
        type === 2 ? <Link to={`/catalog/${id}`}>
            <div>{firstname + " " + lastname}</div>
          </Link> :
          <div>{firstname + " " + lastname}</div>
      }

      <div className="text-gray-500">@{username}</div>
      <Divider />
    </div>
  );
}

export default UserHeader;
