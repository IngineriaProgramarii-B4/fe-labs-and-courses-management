import { Card, Divider } from "antd";
import { useEffect, useState } from "react";
import UserInfoFields from "./UserInfoFields";
import UserHeader from "./UserHeader";
import axios from "axios";
import { UserContext } from "../UserContext/UserContext";

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

function NetworkCard() {
  // @ts-ignore
  const {isUserModified} = useContext(UserContext)

  const [users, setUsers] = useState<UserDataType[]>([]);
  const axiosInstance = axios.create({
      baseURL: "http://localhost:8090/api/v1",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  useEffect(() => {
    /* Fetch data from server */
    axiosInstance.get("/users")
      .then((res) => res.data)
      .then((data) => {
        // @ts-ignore
        setUsers(data.map(item => {
          const { firstname, lastname, ...tmp } = item;
          return {
            ...tmp,
            firstName: firstname,
            lastName: lastname
          };

        }));
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          console.error(err);
        }
      });
  }, [isUserModified]);

  return (
    <div className="flex flex-wrap justify-center items-center">
      {users.map(renderCard)}
    </div>
  );
}

const renderCard = (user: UserDataType) => {
  return (
    <Card className="m-10 w-80 h-96" key={`${user.username}-1234`}>
      <UserHeader
        username={user.username}
        firstname={user.firstName}
        lastname={user.lastName}
        id={user.id}
        type={user.type}
      />
      {Object.entries(user).map(([key, value]) => {
        if (["username", "firstname", "lastname", "type"].indexOf(key) === -1)
          return key !== "id" ? (
            <UserInfoFields title={key} value={value} id={user.id}/>
          ) : (
            ""
          );
      })}
    </Card>
  );
};

  return <div data-testid="network-card" className="flex flex-wrap">{users.map(renderCard)}</div>;
}

export default NetworkCard;
