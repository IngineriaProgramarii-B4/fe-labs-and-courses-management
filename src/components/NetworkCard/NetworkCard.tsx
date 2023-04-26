import { Card, Divider } from "antd";
import { useEffect, useState } from "react";
import UserInfoFields from "./UserInfoFields";
import UserHeader from "./UserHeader";
import axios from "axios";

export type UserDataType = {
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

function NetworkCard() {
  const [users, setUsers] = useState<UserDataType[]>([]);

  useEffect(() => {
    /* Fetch data from server */
    const axiosInstance = axios.create({
      baseURL: "http://localhost:8080/api/v1",
      headers: {
        "Content-Type": "application/json",
      },
    });
    axiosInstance
      .get("/users")
      .then((res) => res.data)
      .then((data) => setUsers(data[0]))
      .catch((err) => {
        if (err.response?.status === 404) {
          console.error(err);
        }
      });
  }, []);

  const renderCard = (user: UserDataType) => {
    return (
      <Card className="m-10 w-200" key={`${user.username}-1234`}>
        <UserHeader
          username={user.username}
          firstname={user.firstName}
          lastname={user.lastName}
        />
        {Object.entries(user).map(([key, value]) => {
          if (["username", "firstname", "lastname", "type"].indexOf(key) === -1)
            return key !== "id" ? (
              <UserInfoFields title={key} value={value} />
            ) : (
              ""
            );
        })}
      </Card>
    );
  };

  return <div className="flex flex-wrap">{users.map(renderCard)}</div>;
}

export default NetworkCard;
