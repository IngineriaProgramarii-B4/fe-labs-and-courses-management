import { Upload, Typography, Space } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { PlusOutlined } from "@ant-design/icons";

interface PhotoUploadProps {
  title: string;
  fileList: UploadFile[];
  setFileList: (fileList: UploadFile[]) => void;
  upFile: File | null;
  setUpFile: (upFile: File) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = (props) => {

  
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    props.setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const dummyRequest = (options: any) => {
    const { onSuccess } = options;
    const { file } = options;
    props.setFileList([file]);
    onSuccess("Ok");
  };

  return (
    <div data-testid="upload-input">
      <Upload
        accept="image/*"
        listType="picture-card"
        fileList={props.fileList}
        onChange={onChange}
        onPreview={onPreview}
        customRequest={dummyRequest}
        beforeUpload={(file) => {
          props.setUpFile(file);
        }}
      >
        {props.fileList.length < 1 && (
          <Space direction="vertical" align="center">
            <PlusOutlined />
            <Typography.Text>Upload Photo</Typography.Text>
          </Space>
        )}
      </Upload>
    </div>
  );
};

export default PhotoUpload;
