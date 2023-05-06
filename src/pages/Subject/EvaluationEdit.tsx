import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Form } from "antd";
const { TextArea } = Input;

interface EvaluationEditProps {
  subjectTitle: string;
  title: string;
  isModified: boolean;
  setIsModified: (isModified: boolean) => void;
  description: string;
  value: number;
  isVisibile: boolean;
  setIsVisible: (isVisible: boolean) => void;
  resetFields: boolean;
  setResetFields: (resetFields: boolean) => void;
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
        `http://localhost:8090/api/v1/subjects/${props.subjectTitle}/evaluationMethods/component=${props.title}`,
        req
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
      open={props.isVisibile}
      onCancel={() => {
        props.setIsVisible(false);
        props.setResetFields(props.resetFields ? false : true);
      }}
      centered
      footer={[
        <Button
          key="close"
          onClick={() => {
            props.setIsVisible(false);
            props.setResetFields(props.resetFields ? false : true);
          }}
        >
          Close
        </Button>,
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white"
          key="save"
          onClick={handleSave}
        >
          Save
        </Button>,
      ]}
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
