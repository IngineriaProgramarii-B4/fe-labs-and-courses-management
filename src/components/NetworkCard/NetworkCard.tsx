import { Card } from "antd";
import { useContext, useEffect, useState } from "react";
import UserInfoFields from "./UserInfoFields";
import UserHeader from "./UserHeader";
import axios from "axios";
import { UserContext } from "../UserContext/UserContext";
import { toast } from "react-toastify";
import { v4 } from "uuid";

export type UserDataType = {
  id: string;
  type: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  registrationNumber?: string;
  enrolledCourses?: string[];
  year?: number;
  semester?: number;
  office?: string;
  department?: string;
  taughtSubjects?: string[];
  title?: string;
};

export default function NetworkCard() {
  // @ts-ignore
  const { isUserModified } = useContext(UserContext);

  const [users, setUsers] = useState<UserDataType[]>([]);
  const [token, setToken] = useState<string>("")
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8082/api/v1",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
  });

  useEffect(() => {
    // @ts-ignore
    setToken(localStorage.getItem("token"));
  }, [])

  useEffect(() => {
    /* Fetch data from server */
    axiosInstance
      .get("/users")
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
    <Card key={v4()}  className="m-10 w-80 h-96">
      <UserHeader
        key={v4()}
        username={user.username}
        firstname={user.firstName}
        lastname={user.lastName}
        id={user.id}
        type={user.type}
      />
      {Object.entries(user).map(([key, value]) => {
        if (["username", "firstname", "lastname", "type"].indexOf(key) === -1)
          return key !== "id" ? (
            <UserInfoFields key={v4()} title={key} value={value} id={user.id} />
          ) : (
            ""
          );
      })}
    </Card>
  );
};