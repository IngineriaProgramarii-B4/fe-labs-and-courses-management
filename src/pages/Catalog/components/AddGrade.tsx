import React, { useState, useEffect } from "react";
import { Modal, Button, Form, DatePicker, Select, InputNumber } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

interface GradesData {
  value: number;
  subject: string;
  evaluationDate: string;
  deleted: boolean;
}

export default function AddGrade(props: { fetchGrades: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectName, setSubjectName] = useState<string>("");
  const [gradeValue, setGradeValue] = useState<number>(0);
  const [evDateValue, setEvDateValue] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const { id } = useParams();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleAddGrade();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    // console.log(storedToken);
  }, []);
  const handleAddGrade = () => {
    if (subjectName && gradeValue && evDateValue) {
      const gradesData: GradesData = {
        value: gradeValue,
        subject: subjectName,
        evaluationDate: evDateValue,
        deleted: false,
      };

      axios
        .post(
          `http://localhost:8082/api/v1/students/${id}/grades`,
          gradesData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setSubjectName("");
          setGradeValue(0);

          props.fetchGrades();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <Button onClick={showModal}>Add Grade +</Button>
      <Modal
        title="Add Grade"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add"
        centered={true}
        destroyOnClose={true}
        width={400}
        okType="default"
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Subject" htmlFor="subjectName">
            <Select
              onChange={(value: string) => setSubjectName(value)}
              defaultValue="Select a subject..."
              options={[
                { value: "IP", label: "IP" },
                { value: "PA", label: "PA" },
              ]}
            />
          </Form.Item>
          <Form.Item label="Grade" htmlFor="gradeValue">
            <InputNumber
              min={1}
              max={10}
              defaultValue={5}
              onChange={(value: any) => {
                setGradeValue(value);
              }}
            />
          </Form.Item>
          <Form.Item label="Date" htmlFor="date">
            <DatePicker
              data-testid="edit-date"
              format="DD.MM.YYYY"
              onChange={(date, dateString) => {
                setEvDateValue(dateString);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
