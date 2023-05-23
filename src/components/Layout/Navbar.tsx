import React, { useState, useEffect } from "react";
import { Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
import UserInfoModal from "../UserInfoModal/UserInfoModal";
import mockedAvatar from "../../mockedData/mockedAvatar.jpg";
<<<<<<< HEAD
import axios from "axios";
import { useJwt } from "react-jwt";
=======

const items = [
  {
    key: "1",
    title: "Home",
    label: <Link to="/home">Home</Link>,
  },
  {
    key: "2",
    title: "Home",
    label: <Link to="/subjects">Subjects</Link>,
  },
  {
    key: "3",
    title: "Network",
    label: <Link to="/network/all">Network</Link>,
  },
  {
    key: "4",
    title: "Home",
    label: <Link to="/catalog">Catalog</Link>,
  },
  {
    key: "5",
    title: "Home",
    label: <Link to="/reminders">Reminders</Link>,
  },
  {
    key: "6",
    title: "Home",
    label: <UserInfoModal avatar={mockedAvatar} />,
    disabled: true,
    style: { marginLeft: "auto", cursor: "default" },
  },
];
>>>>>>> 500d3558ec348ad506f8e22ba30216e5fbbc07ba

function Navbar() {
  const [current, setCurrent] = useState("Home");
  const [token, setToken] = useState<string | null>(null);
  const { decodedToken }: any = useJwt(token as string);
  const studentName = decodedToken?.sub;
  const [email, setEmail] = useState<string>("");
  const [id, setId] = useState<string>("");
  const role = decodedToken?.role;

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  async function fetchUserInfo(email: string) {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/users?email=${email}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      console.log(data[0]);
      setId(data[0].id);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (studentName) {
      fetchUserInfo(studentName);
    }
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    if (token) {
      setEmail(decodedToken?.sub);
    }
  }, []);

  const items = [
    {
      key: "1",
      title: "Home",
      label: <Link to="/home">Home</Link>,
    },
    {
      key: "2",
      title: "Home",
      label: <Link to="/subjectalex">Subjects</Link>,
    },
    {
      key: "3",
      title: "Network",
      label: <Link to="/network/all">Network</Link>,
    },
    {
      key: "4",
      title: "Home",
      label: <Link to={`/catalog/${id}`}>Catalog</Link>,
    },
    {
      key: "5",
      title: "Home",
      label: <Link to="/reminders">Reminders</Link>,
    },
    {
      key: "6",
      title: "Home",
      label: <UserInfoModal avatar={mockedAvatar} />,
      disabled: true,
      style: { marginLeft: "auto", cursor: "default" },
    },
  ];

  const modifiedItems =
    role === "TEACHER" ? items.filter((item) => item.key !== "4") : items;

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={modifiedItems}
    />
  );
}

export default Navbar;
