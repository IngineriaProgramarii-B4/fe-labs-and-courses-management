import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import UserInfoModal from "../UserInfoModal/UserInfoModal";
import mockedAvatar from "../../mockedData/mockedAvatar.jpg";
import hat from "../../img/hat.png";
import { useLocation } from "react-router-dom";

const linkStyles = { color: "white" };

const items = [
  {
    key: "0",
    icon: (
      <Link to="/home">
        <img src={hat} className="w-12" alt={"Home"} />{" "}
      </Link>
    ),
    disabled: true,
  },
  {
    key: "1",
    title: "Home",
    label: <Link to="/home">Home</Link>,
    style: linkStyles,
  },
  {
    key: "2",
    title: "Subjects",
    label: <Link to="/subjects">Subjects</Link>,
    style: linkStyles,
  },
  {
    key: "3",
    title: "Network",
    label: <Link to="/network/all">Network</Link>,
    style: linkStyles,
  },
  {
    key: "5",
    title: "Reminders",
    label: <Link to="/reminders">Reminders</Link>,
    style: linkStyles,
  },
  {
    key: "6",
    title: "Avatar",
    label: <UserInfoModal avatar={mockedAvatar} />,
    disabled: true,
    style: { marginLeft: "auto", cursor: "default" },
  },
];

function Navbar() {
  let location = useLocation();

  return (
    <Menu
      selectedKeys={[
        items.find(
          (item) =>
            item.title && location.pathname.includes(item.title.toLowerCase())
        )?.key || "Home",
      ]}
      mode="horizontal"
      items={items}
      className="m-auto p-5 bg-transparent text-white text-xl flex flex-row items-center"
    />
  );
}

export default Navbar;
