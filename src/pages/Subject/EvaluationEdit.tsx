import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Form } from "antd";
import { v4 } from "uuid";
const { TextArea } = Input;

interface EvaluationEditProps {
  subjectTitle: string;
  title: string;
  isModified: boolean;
  setIsModified: (isModified: boolean) => void;
  description: string;
  value: number;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  resetFields: boolean;
  setResetFields: (resetFields: boolean) => void;
  role: String;
}

const EvaluationEdit: React.FC<EvaluationEditProps> = (props) => {
  const [inputDescription, setInputDescription] = useState<string>(
    props.description
  );
  const [value, setValue] = useState<number>(props.value);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      description: props.description,
      value: props.value,
    });
    setInputDescription(props.description);
    setValue(props.value);
  }, [props.resetFields]);

  const handleSave = async () => {
    try {
      const req = {
        component: props.title,
        description: inputDescription,
        value: value,
      };
      await axios.put(
        `http://localhost:8082/api/v1/subjects/${props.subjectTitle}/evaluationMethods/component=${props.title}`,
        req,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      props.setIsModified(props.isModified ? false : true);
      props.setIsVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title={`Edit ${props.title}`}
      open={props.isVisible}
      onCancel={() => {
        props.setIsVisible(false);
        props.setResetFields(props.resetFields ? false : true);
      }}
      centered
      footer={[
        <Button
          key={v4()}
          onClick={() => {
            props.setIsVisible(false);
            props.setResetFields(props.resetFields ? false : true);
            console.log(props.isVisible);
          }}
        >
          Close
        </Button>,
        <Button
          className="bg-buttonBlue hover:bg-hoverBlue"
          key={v4()}
          type="primary"
          onClick={handleSave}
        >
          Save
        </Button>,
      ]}
      forceRender={true}
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="Description" name="description">
          <TextArea
            rows={4}
            value={inputDescription}
            onChange={(e) => setInputDescription(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EvaluationEdit;
