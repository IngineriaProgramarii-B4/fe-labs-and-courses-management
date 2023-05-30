import React, { useEffect } from "react";
import { Form, Input, Row, Col, Select, UploadFile } from "antd";
import PhotoUpload from "./PhotoUpload";
const { TextArea } = Input;

interface SubjectFormProps {
  action: string;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  year: number;
  setYear: (year: number) => void;
  semester: number;
  setSemester: (semester: number) => void;
  credits: number;
  setCredits: (credits: number) => void;
  resetFields: boolean;
  upFile: File | null;
  setUpFile: (upFile: File) => void;
  fileList: UploadFile[];
  setFileList: (fileList: UploadFile[]) => void;
}

const SubjectForm: React.FC<SubjectFormProps> = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: props.title,
      description: props.description,
      year: props.year,
      semester: props.semester,
      credits: props.credits,
    });
  }, [props.resetFields]);

  return (
    <>
      <Form layout="vertical" name={`${props.action}_subject`} form={form}>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: props.action === "add" ? true : false,
              message: "Please input the title of the subject!",
            },
          ]}
        >
          <Input
            value={props.title}
            onChange={(event) => props.setTitle(event.target.value)}
          />
        </Form.Item>

        <Row>
          <Col span={12} style={{ paddingRight: "10px" }}>
            <Form.Item
              label="Year"
              name="year"
              rules={[
                {
                  required: props.action === "add" ? true : false,
                  message: "Please select the year of the subject!",
                },
              ]}
            >
              <Select
                value={props.year}
                onChange={(event) => props.setYear(event)}
              >
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12} style={{ paddingLeft: "10px" }}>
            <Form.Item
              label="Semester"
              name="semester"
              rules={[
                {
                  required: props.action === "add" ? true : false,
                  message: "Please select the semester of the subject!",
                },
              ]}
            >
              <Select
                value={props.semester}
                onChange={(event) => props.setSemester(event)}
              >
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Number of credits"
          name="credits"
          rules={[
            {
              required: props.action === "add" ? true : false,
              message: "Please select the number of credits of the subject!",
            },
          ]}
        >
          <Select
            value={props.credits}
            onChange={(event) => props.setCredits(event)}
          >
            <Select.Option value="4">4</Select.Option>
            <Select.Option value="5">5</Select.Option>
            <Select.Option value="6">6</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: props.action === "add" ? true : false,
              message: "Please input the description of the subject!",
            },
          ]}
        >
          <TextArea
            rows={4}
            value={props.description}
            onChange={(event) => props.setDescription(event.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Subject image"
          name="image"
          rules={[
            {
              required: props.action === "add" ? true : false,
              message: "Please input the image of the subject!",
            },
          ]}
        >
          <PhotoUpload
            title={props.title}
            upFile={props.upFile}
            setUpFile={props.setUpFile}
            fileList={props.fileList}
            setFileList={props.setFileList}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default SubjectForm;
