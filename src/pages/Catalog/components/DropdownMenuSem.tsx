import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "1",
  },
  {
    key: "2",
    label: "2",
  },
];

const App: React.FC = () => (
  <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Semesters
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default App;
