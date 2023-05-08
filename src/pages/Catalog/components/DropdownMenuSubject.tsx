import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Math",
  },
  {
    key: "2",
    label: "History",
  },
  {
    key: "3",
    label: "Geography",
  },
  {
    key: "4",
    label: "Chemistry",
  },
];

const App: React.FC = () => (
  <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Subjects
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default App;
