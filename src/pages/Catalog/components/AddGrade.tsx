import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Form } from "antd";
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

  const handleSubjectNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubjectName(event.target.value);
    console.log(subjectName);
  };

  const handleGradeValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGradeValue(Number(event.target.value));
  };

  const handleEvDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEvDateValue(event.target.value);
  };

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
              Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      <Button onClick={showModal}>+</Button>
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
            <Input
              onChange={handleSubjectNameChange}
              placeholder="Subject name..."
              id="subjectName"
            />
          </Form.Item>
          <Form.Item label="Grade" htmlFor="gradeValue">
            <Input
              onChange={handleGradeValueChange}
              placeholder="Grade value..."
              id="gradeValue"
            />
          </Form.Item>
          <Form.Item label="Date" htmlFor="date">
            <Input
              onChange={handleEvDateChange}
              placeholder="Date of evaluation..."
              id="date"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
