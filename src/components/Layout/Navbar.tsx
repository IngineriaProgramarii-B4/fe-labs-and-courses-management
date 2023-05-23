import React, { useState } from "react";
import { Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
import UserInfoModal from "../UserInfoModal/UserInfoModal";
import mockedAvatar from "../../mockedData/mockedAvatar.jpg";
import hat from "../../img/hat.png"

const items = [
  {
    key: "0",
    icon: <Link to="/home"><img src={hat} className="w-12"/> </Link>,
  },
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
    key: "5",
    title: "Home",
    label: <Link to="/reminders">Reminders</Link>,
  },
  {
    key: "6",
    title: "Home",
    label: <UserInfoModal avatar={mockedAvatar} />,
    disabled: true,
    style: { marginLeft: "auto", cursor: "default"},
  },
];

function Navbar() {
  const [current, setCurrent] = useState("Home");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      className="m-auto p-5 bg-transparent text-white text-xl flex flex-row items-center"
    />
  );
}

export default Navbar;
