import React, { useState, useEffect } from "react";
import { Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
import UserInfoModal from "../UserInfoModal/UserInfoModal";
import mockedAvatar from "../../mockedData/mockedAvatar.jpg";
import axios from "axios";
import { useJwt } from "react-jwt";
import { useLocation } from "react-router-dom";

function Navbar() {
  let location = useLocation();
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
      selectedKeys={[
        items.find(
          (item) =>
            item.title && location.pathname.includes(item.title.toLowerCase())
        )?.key || "Home",
      ]}
      mode="horizontal"
      items={modifiedItems}
      className="m-auto p-5 bg-transparent text-white text-xl flex flex-row items-center"
    />
  );
}

export default Navbar;
