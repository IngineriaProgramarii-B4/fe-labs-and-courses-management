import React, { useState } from "react";
import { Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
import UserInfoModal from "../UserInfoModal/UserInfoModal";
import mockedAvatar from "../../mockedData/mockedAvatar.jpg";

function Navbar() {
  const [current, setCurrent] = useState("Home");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key={"Home"}>
        <Link to="/home">Home</Link>
      </Menu.Item>
      <Menu.Item key={"Catalog"}>
        <Link to="/catalog">Catalog</Link>
      </Menu.Item>
      <Menu.Item disabled style={{ marginLeft: "auto", cursor: "default" }}>
        <UserInfoModal userType={"student"} avatar={mockedAvatar} />
      </Menu.Item>
    </Menu>
  );
}

export default Navbar;
