import axios from "axios";
import React, { useEffect, useState } from "react";
import { Popconfirm, Table, Button, Modal, Space, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import FileTransfer from "./FileTransfer";

import "./Accordion.css";

interface DataType {
  key: React.Key;
  title: string;
  timeStamp: string;
  type: string;
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

  const handleGetFile = async (fileName: string) => {
    try {
      const file = data.find((item) => item.title === fileName);
      if (!file) return console.log("File not found");
      const res = await axios.get(
        `http://localhost:8090/api/v1/subjects/${props.title}/components/${props.component}/resources/file=${fileName}`,
        {
          responseType: "arraybuffer",
        }
      );
      const blob = new Blob([res.data], { type: file.type });

      const url = window.URL.createObjectURL(blob);
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", file.title);
      // link.click();
      window.open(url);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Resource Title",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <Typography.Link onClick={() => handleGetFile(text)}>
          {text}
        </Typography.Link>
      ),
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
        <Popconfirm
          okButtonProps={{ className: "okbutton" }}
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.key)}
        >
          <a>Delete</a>
        </Popconfirm>
      ),
    },
  ];
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

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
            timeStamp: item.timeStamp,
            type: item.type,
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

  const [clearFileList, setClearFileList] = useState(false);
  return (
    <div>
      <Button
        type="primary"
        className="add-button"
        onClick={() => {
          showModal();
        }}
      >
        Add resource
      </Button>
      <Modal
        title={"Add resource"}
        open={isModalOpen}
        onCancel={() => {
          setClearFileList(clearFileList ? false : true);
          fetchData();
          handleCancel();
        }}
        footer={
          <Button
            className="okbutton"
            key="ok"
            type="primary"
            onClick={() => {
              setClearFileList(clearFileList ? false : true);
              fetchData();
              handleCancel();
            }}
          >
            Ok
          </Button>
        }
      >
        <FileTransfer
          component={props.component}
          title={props.title}
          clearFileList={clearFileList}
        />
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
