import { Divider } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { isRoleType } from "./NetworkCard";

export type UserHeaderProps = {
  id: string;
  roles: {
    id: number;
    name: string;
  }[];
  username: string;
  firstname: string;
  lastname: string;
};

function UserHeader({
  username,
  firstname,
  lastname,
  id,
  roles,
}: UserHeaderProps) {
  const isStudent = isRoleType(roles) && roles.find((role) => role.id === 3);

  return (
    <div style={{ textAlign: "center", fontWeight: "bold" }}>
      {isStudent ? (
        <Link to={`/catalog/${id}`}>
          <div>{firstname + " " + lastname}</div>
        </Link>
      ) : (
        <div>{firstname + " " + lastname}</div>
      )}

      <div className="text-gray-500">@{username}</div>
      <Divider />
    </div>
  );
}

export default UserHeader;
