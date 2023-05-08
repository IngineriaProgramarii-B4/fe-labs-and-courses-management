import React, { useState } from "react";
import { Modal, Button, Input, Form } from "antd";
import styles from "../Catalog.module.scss";
import axios from "axios";

interface GradesData {
  value: number;
  subject: {
    name: string;
    teachers: {
      idProf: number;
      email: string;
      name: string;
      teachedSubjects: string[];
      id: number;
    }[];
  };
  evaluationDate: string;
  id: number;
}

export default function AddGrade(props: { fetchGrades: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectName, setSubjectName] = useState<string>("");
  const [gradeValue, setGradeValue] = useState<number>(0);
  const [evDateValue, setEvDateValue] = useState<string>("");

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
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddGrade = () => {
    if (subjectName && gradeValue) {
      const gradesData: GradesData = {
        value: gradeValue,
        subject: {
          name: subjectName,
          teachers: [
            {
              idProf: 0,
              email: "string",
              name: "string",
              teachedSubjects: ["string"],
              id: 0,
            },
          ],
        },
        evaluationDate: evDateValue,
        id: 0,
      };

      axios
        .post(
          "http://localhost:8081/api/v1/catalog/students/1/grades",
          gradesData,
          {
            headers: {
              "Content-Type": "application/json",
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
        footer={false}
        centered={true}
        destroyOnClose={true}
        width={400}
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
        <div className={styles.action_btn}>
          <Button
            onClick={() => {
              handleAddGrade();
              setIsModalOpen(false);
            }}
          >
            Add
          </Button>
        </div>
      </Modal>
    </>
  );
}
