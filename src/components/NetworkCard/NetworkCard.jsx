import styled from "styled-components";
import { Card, Divider } from "antd";
import { useEffect, useState } from "react";

function UserInfo({ title, value }) {
  return (
    <div className={"flex h-[2rem]"}>
      <p className={"my-auto w-[8.5rem] text-end text-gray-500"}>{title}:</p>
      <p className={"my-auto ml-3"}>{Array.isArray(value) ? value.map((course, index) => course + (index !== value.length - 1 ? ", " : "")) : value}</p>
    </div>
  );
}


function Title({username, firstname, lastname}) {
  return (
    <div style={{textAlign: "center", fontWeight: "bold"}}>
      <div>{firstname + " " + lastname}</div>
      <div>@{username}</div>
      <Divider />
    </div>
  );
}


const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const capitalizeString = (str) => {
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
  return str2;
};

export default function NetworkCard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const renderCard = (user) => {
    return (
      <Card style={{flexBasis: '30%', marginTop: '10px'}}>
        <Title username={user.username} firstname={user.firstname} lastname={user.lastname}/>
          {Object.entries(user).map(([key, value]) => {
            if (["username", "firstname", "lastname"].indexOf(key) === -1)
              return (
                <UserInfo title={key} value={value}/>
              );
          })}
      </Card>
    );
  };

  return <Wrapper>{users.map(renderCard)}</Wrapper>;
}
