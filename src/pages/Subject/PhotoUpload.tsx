import axios from 'axios';
import { Upload, Modal, Typography, Space } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const { Dragger } = Upload;


interface PhotoUploadProps {
    title: string;
    modalOpen: boolean;
    setModalOpen: (modalOpen: boolean) => void;
}


const PhotoUpload: React.FC<PhotoUploadProps> = (props) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [upFile, setUpFile] = useState<File>();

    const onChange: UploadProps['onChange'] = ({fileList: newFileList}) => {
        setFileList(newFileList);
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
    
    const handleFileUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("image", upFile as Blob);
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },
            };
            const res = await axios.put(
                `http://localhost:8090/api/v1/subjects/subjectTitle=${props.title}/image`,
                formData,
                config
            );
            console.log(res);
            setFileList([]);
            props.setModalOpen(false);
        } catch (err) {
            console.log(err);
        }
    }

    const dummyRequest = (options: any) => {
        const { onSuccess } = options;
        const { file } = options;
        setFileList([file]);
        onSuccess("Ok");
      };

    return (
        <div>
            <Modal
                okButtonProps={{className: "okbutton"}} 
                open={props.modalOpen}
                title="Photo Upload"
                onCancel={() => {
                    setFileList([]);
                    props.setModalOpen(false)
                }}
                onOk={handleFileUpload}
                destroyOnClose={true}
            >
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    customRequest={dummyRequest}
                    beforeUpload={(file) => {
                        setUpFile(file);
                    }}
                >
                    {
                        fileList.length < 1 && (
                            <Space direction="vertical" align="center">
                                <PlusOutlined />
                                <Typography.Text>Upload Photo</Typography.Text>
                            </Space>
                        )
                    }
                </Upload>   
            </Modal>
        </div>
    );
}

export default PhotoUpload;