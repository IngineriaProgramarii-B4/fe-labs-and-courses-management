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
      <Menu.Item key={"Subjects"}>
        <Link to="/subjects">Subjects</Link>
      </Menu.Item>
      <Menu.Item key={"Network"}>
        <Link to="/network">Network</Link>
      </Menu.Item>
      <Menu.Item key={"Catalog"}>
        <Link to="/catalog">Catalog</Link>
      </Menu.Item>
      <Menu.Item key={"Reminders"}>
        <Link to="/reminders">Reminders</Link>
      </Menu.Item>
      <Menu.Item key={"User Info"} disabled style={{ marginLeft: "auto", cursor: "default" }}>
          <UserInfoModal avatar={mockedAvatar} />
      </Menu.Item>
    </Menu>
  );
}

export default Navbar;
