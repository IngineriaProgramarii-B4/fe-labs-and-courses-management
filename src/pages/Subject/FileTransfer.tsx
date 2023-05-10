import axios from "axios";
import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

interface FileTransferProps {
  component: string;
  title: string;
  clearFileList: boolean;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

const FileTransfer: React.FC<FileTransferProps> = (props) => {
  const [fileList, setFileList] = useState<any>([]);

  useEffect(() => {
    setFileList([]);
  }, [props.clearFileList]);

  const handleFileUpload = async (options: any) => {
    console.log(options);
    const { onError, file, onProgress, onSuccess } = options;
    const formData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      onUploadProgress: (event: any) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        onProgress({ percent });
      },
    };
    formData.append("file", file);
    try {
      const res = await axios.post(
        `http://localhost:8090/api/v1/subjects/${props.title}/components/${props.component}/resources`,
        formData,
        config
      );
      console.log(res);
      message.success(`${file.name} file uploaded successfully.`);
      onSuccess("Ok");
    } catch (err) {
      console.log(err);
      message.error(`${file.name} file upload failed.`);
      onError({ err });
    }
  };

  const onFileChange = ({ file, fileList }: any) => {
    console.log(fileList);
    setFileList(fileList);
  };

  return (
    <Dragger data-testid="file-input"
      showUploadList={{ showRemoveIcon: false }}
      multiple
      customRequest={handleFileUpload}
      onChange={onFileChange}
      fileList={fileList}
      onDrop={props.onDrop}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
    </Dragger>
  );
};

export default FileTransfer;
