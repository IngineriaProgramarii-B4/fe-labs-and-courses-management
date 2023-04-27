import axios from "axios";
import React, { useEffect, useState } from "react";
import { Popconfirm, Table, Button, Modal, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

import "./Accordion.css";

interface DataType {
  key: React.Key;
  title: string;
  location: string;
  timeStamp: string;
}

interface ResourcesTableProps {
  component: string;
  title: string;
}

const ResourcesTable: React.FC<ResourcesTableProps> = (props) => {
  const handleDelete = async (key: React.Key) => {
    try {
      await axios.delete(
        `http://localhost:8090/api/v1/subjects/${props.title}/components/${props.component}/resources/title=${key}`
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Resource Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Timestamp",
      dataIndex: "timeStamp",
      key: "timeStamp",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: any) => (
        <Space size="middle">
          <a
            onClick={() => {
              setOldTitle(record.title);
              setTitleInput(record.title);
              setLocationInput(record.location);
              setAction("edit");
              showModal();
            }}
          >
            Edit
          </a>
          <Popconfirm
            okButtonProps={{ className: "okbutton" }}
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<"add" | "edit">("add");

  const fetchData = () => {
    setLoading(true);
    axios
      .get(
        `http://localhost:8090/api/v1/subjects/${props.title}/components/${props.component}/resources`
      )
      .then((res) => {
        const resModify: DataType[] = res.data.map((item: any) => {
          return {
            key: item.title,
            title: item.title,
            location: item.location,
            timeStamp: item.timeStamp,
          };
        });
        setData(resModify);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        setData([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    const resource = {
      title: titleInput,
      location: locationInput,
    };
    try {
      await axios.post(
        `http://localhost:8090/api/v1/subjects/${props.title}/components/${props.component}/resources`,
        resource
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen(false);
    setLocationInput("");
    setTitleInput("");
  };

  const handleUpdate = async () => {
    const resource = {
      title: titleInput,
      location: locationInput,
    };
    try {
      await axios.put(
        `http://localhost:8090/api/v1/subjects/${props.title}/components/${props.component}/resources/title=${oldTitle}`,
        resource
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen(false);
    setLocationInput("");
    setTitleInput("");
  };

  const [titleInput, setTitleInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [oldTitle, setOldTitle] = useState("");

  return (
    <div>
      <Button
        type="primary"
        className="add-button"
        onClick={() => {
          setAction("add");
          showModal();
        }}
      >
        Add resource
      </Button>
      <Modal
        title={action === "add" ? "Add Resource" : "Edit Resource"}
        okButtonProps={{ className: "okbutton" }}
        open={isModalOpen}
        okText={action === "add" ? "Add" : "Edit"}
        onOk={action === "add" ? handleSave : handleUpdate}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 10 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Title">
            <Input
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Location">
            <Input
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
      />
    </div>
  );
};

export default ResourcesTable;
