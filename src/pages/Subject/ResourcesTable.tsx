import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Typography } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ColumnsType } from "antd/es/table";
import FileTransfer from "./FileTransfer";



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
        <div>
          <FontAwesomeIcon data-testid = "delete-icon" 
            onClick={() => {
              showModal2();
            }}
            icon={faTrash}
            className="hover:text-red-500 "
          />
          <Modal
            visible={isModalOpen2}
            onOk={() => {
              handleDelete(record.key);
              setIsModalOpen2(false);
            }}
            onCancel={handleCancel}
            okType="danger"
            okText="Yes"
            cancelText="No"
            closable={false}
          >
            <div className="font-bold text-center mb-5 text-xl">
              <ExclamationCircleFilled className="text-yellow-500 mr-4 text-2xl" />
              Are you sure you wish to delete this resource?
            </div>
            <div className="text-center">You can't revert your actions</div>
          </Modal>
        </div>
        /*
        <Popconfirm
          //okButtonProps={{ className: "okbutton" }}
          okType="danger"
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.key)}
        >
          <FontAwesomeIcon icon={faTrash} className="hover:text-red-500 " />
        </Popconfirm>
        */
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

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleCancel = () => {
    setIsModalOpen1(false);
    setIsModalOpen2(false);
  };

  const [clearFileList, setClearFileList] = useState(false);
  return (
    <div>
      <FontAwesomeIcon
        data-testid="add-button"
        onClick={() => {
          showModal1();
        }}
        icon={faFolderPlus}
        size="2x"
        className=" px-10 hover:text-blue-500"
      />
      <Modal
        data-testid="modal"
        title={"Add resource"}
        open={isModalOpen1}
        onCancel={() => {
          setClearFileList(clearFileList ? false : true);
          fetchData();
          handleCancel();
        }}
        footer={
          <Button
            //className="okbutton"
            className="bg-buttonBlue hover:bg-hoverBlue"
            data-testid = "ok-add-button"
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
          onDrop={(e) => {
            console.log("Dropped files", e.dataTransfer.files);
          }}
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
