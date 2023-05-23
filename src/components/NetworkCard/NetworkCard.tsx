import { Card } from "antd";
import { useContext, useEffect, useState } from "react";
import UserInfoFields from "./UserInfoFields";
import UserHeader from "./UserHeader";
import axios from "axios";
import { UserContext } from "../UserContext/UserContext";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { useParams } from "react-router-dom";

export type CourseType = {
  title: string;
  description: string;
  credits: number;
  year: number;
  semester: number;
};

export function isRoleType(
  roles: any
): roles is { id: number; name: string }[] {
  if (!Array.isArray(roles)) return false;
  return roles.every(
    (role) =>
      typeof role === "object" &&
      role !== null &&
      typeof role.id === "number" &&
      typeof role.name === "string"
  );
}

export type UserDataType = {
  id: string;
  roles: {
    id: number;
    name: string;
  }[];
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  registrationNumber?: string;
  enrolledCourses?: CourseType[];
  year?: number;
  semester?: number;
  office?: string;
  department?: string;
  taughtSubjects?: string[];
  title?: string;
};

const filteredFields = [
  { backend: "firstName", frontend: "First Name" },
  { backend: "lastName", frontend: "Last Name" },
  { backend: "email", frontend: "Email" },
  { backend: "username", frontend: "Username" },
  { backend: "registrationNumber", frontend: "Registration Number" },
  { backend: "office", frontend: "Office" },
  { backend: "department", frontend: "Department" },
  { backend: "title", frontend: "Title" },
  { backend: "taughtSubjects", frontend: "Taught Subjects" },
  { backend: "year", frontend: "Year" },
  { backend: "semester", frontend: "Semester" },
  { backend: "enrolledCourses", frontend: "Enrolled Courses" },
];

export default function NetworkCard() {
  // @ts-ignore
  const { isUserModified } = useContext(UserContext);

  const { param } = useParams();

  const [users, setUsers] = useState<UserDataType[]>([]);
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8082/api/v1",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    const endpoint =
      param === "all" ? "/users" : `/students/enrolledCourse/${param}`;
    /* Fetch data from server */
    axiosInstance
      .get(endpoint)
      .then((res) => res.data)
      .then((data) => {
        setUsers(
          // @ts-ignore
          data.map((item) => {
            const { firstname, lastname, ...tmp } = item;
            return {
              ...tmp,
              firstName: firstname,
              lastName: lastname,
            };
          })
        );
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          toast.error(err.message);
        }
      });
  }, [isUserModified]);

  return (
    <div data-testid="network-card" className="flex flex-wrap">
      {users.map(renderCard)}
    </div>
  );
}

const renderCard = (user: UserDataType) => {
  return (
    <Card key={v4()} className="m-10 w-80 h-96">
      <UserHeader
        key={v4()}
        username={user.username || "jondoe"}
        firstname={user.firstName || "Florin"}
        lastname={user.lastName || "Olariu"}
        id={user.id}
        roles={user.roles}
      />
      {Object.entries(user).map(([key, value]) => {
        const fieldData = filteredFields.find((field) => field.backend === key);

        return fieldData ? (
          <UserInfoFields
            key={v4()}
            title={fieldData.frontend}
            value={(!isRoleType(value) && value) || "Not set"}
            id={user.id}
          />
        ) : (
          ""
        );
      })}
    </Card>
  );
};
