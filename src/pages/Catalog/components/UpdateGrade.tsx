import React, { useState } from "react";
import { Modal, Button, Input, Form } from "antd";
import axios from "axios";
import styles from "../Catalog.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function UpdateGrade(props: {
  fetchGrades: () => void;
  id: number;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gradeValue, setGradeValue] = useState<number>(0);
  const [evDateValue, setEvDateValue] = useState<string>("");

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
  const handleUpdateGrade = (id: number) => {
    axios
      .put(
        `http://localhost:8082/api/v1/students/2a2dfe47-3502-46c0-a02d-13f2521f23bf/grades/${id}?value=${gradeValue}&evaluationDate=${evDateValue}`,
        {
          value: gradeValue,
          evaluationDate: evDateValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        props.fetchGrades();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <div
        data-testid="edit_img"
        className={styles.edit_img}
        onClick={() => {
          console.log("grade id:", props.id);
          showModal();
        }}
      >
        <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#849ed0" }} />
      </div>
      <Modal
        title="Update Grade"
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
          <Form.Item label="Grade">
            <Input
              onChange={handleGradeValueChange}
              placeholder="New grade value..."
            />
          </Form.Item>
          <Form.Item label="Date">
            <Input
              onChange={handleEvDateChange}
              placeholder="New date of evaluation..."
            />
          </Form.Item>
        </Form>
        <div className={styles.action_btn}>
          <Button
            onClick={() => {
              handleUpdateGrade(props.id);
              setIsModalOpen(false);
            }}
          >
            Update
          </Button>
        </div>
      </Modal>
    </>
  );
}
