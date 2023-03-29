import React, { useState } from "react";
import { Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
import UserInfoModal from "../UserInfoModal/UserInfoModal";

function Navbar() {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
    >
      <Menu.Item key={"Home"}>
        <Link to="/home">Home</Link>
      </Menu.Item>
      <Menu.Item key={"Catalog"}>
        <Link to="/catalog">Catalog</Link>
      </Menu.Item>
      <Menu.Item disabled style={{marginLeft: "auto", cursor: "default"}}>
        <UserInfoModal userType={"teacher"} firstName={"Olariu"} lastName={"Florin"} username={"olariuflorin"} email={"olariuflorin@gmail.com"} />
      </Menu.Item>
    </Menu>
  );
}

export default Navbar;
