import { Card, Divider } from "antd";
import { useEffect, useState } from "react";
import UserInfoFields from "./UserInfoFields";
import UserHeader from "./UserHeader";
import axios from "axios";

type UserDataType = {
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
  const [users, setUsers] = useState<UserDataType[]>([]);

  useEffect(() => {
    /* Fetch data from server */
    const axiosInstance = axios.create({
        baseURL: "http://localhost:8080/api/v1",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    axiosInstance.get("/users")
      .then((res) => res.data)
      .then((data) => setUsers(data))
      .catch((err) => {
        if (err.response?.status === 404) {
          console.error(err);
        }
      });

    // DUMMY DATA

    const USERS: UserDataType[] = [
      {
        email: "diana.cuzic@gmail.com",
        firstName: "Diana",
        lastName: "Cuzic",
        username: "dianacuzic",
        office: "P1",
        department: "Secretary"
      },
      {
        email: "stefan.ciobaca@uaic.com",
        firstName: "Stefan",
        lastName: "Ciobaca",
        username: "stefan.ciobaca",
        title: "Prof",
        taughtSubjects: ["PA", "PF", "Logica"]
      },
      {
        email: "florin.eugen@uaic.ro",
        firstName: "Florin",
        lastName: "Rotaru",
        username: "florin02",
        year: 2,
        semester: 4,
        registrationNumber: "123FAKE92929",
        enrolledCourses: ["IP", "PA", "SGBD", "TW", "SE"]
      }
    ];

    setUsers(USERS);
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
            return key !== "id" ? <UserInfoFields title={key} value={value} /> : "";
        })}
      </Card>
    );
  };

  return <div className="flex flex-wrap">{users.map(renderCard)}</div>;
}
