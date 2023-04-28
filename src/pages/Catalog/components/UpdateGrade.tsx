import React from "react";
import { useState } from "react";
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
        `http://localhost:8081/api/v1/catalog/students/1/grades/${id}?value=${gradeValue}&evaluationDate=${evDateValue}`,
        {
          value: gradeValue,
          evaluationDate: evDateValue,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
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
      {/* <img
        src={require("../../../img/edit.png")}
        alt="bntu"
        className={styles.trash_img}
        onClick={() => {
          console.log("grade id:", props.id);
          showModal();
        }}
      /> */}
      <div
        data-testId="edit_img"
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
          <Form.Item>
            <Button
              onClick={() => {
                handleUpdateGrade(props.id);
                setIsModalOpen(false);
              }}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
