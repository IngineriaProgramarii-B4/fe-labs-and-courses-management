import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputNumber, DatePicker } from "antd";
import axios from "axios";
import styles from "../Catalog.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export default function UpdateGrade(props: {
  fetchGrades: () => void;
  id: number;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gradeValue, setGradeValue] = useState<number>(0);
  const [evDateValue, setEvDateValue] = useState<string>(" ");
  const [currentGradeValue, setCurrentGradeValue] = useState<number>(0);
  const [currentEvDateValue, setCurrentEvDateValue] = useState<string>(
    dayjs().format("DD.MM.YYYY")
  );
  const { id } = useParams();

  const showModal = () => {
    setEvDateValue(currentEvDateValue);
    setGradeValue(currentGradeValue);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function fetchGrade() {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/students/${id}/grades/${props.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      setCurrentGradeValue(data.value);
      setCurrentEvDateValue(data.evaluationDate);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchGrade();
  }, [evDateValue, gradeValue, fetchGrade()]);

  useEffect(() => {}, [currentEvDateValue, currentGradeValue]);

  const handleUpdateGrade = (gradeId: number) => {
    axios
      .put(
        `http://localhost:8082/api/v1/students/${id}/grades/${gradeId}?value=${gradeValue}&evaluationDate=${evDateValue}`,
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
        toast.success("Grade updated successfully!");
        props.fetchGrades();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error updating grade!");
      });
  };
  return (
    <>
      <div
        data-testid="edit_img"
        className={styles.edit_img}
        onClick={() => {
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
            <InputNumber
              className="w-[13rem]"
              min={1}
              max={10}
              defaultValue={currentGradeValue}
              onChange={(value: any) => {
                setGradeValue(value);
              }}
            />
          </Form.Item>
          <Form.Item label="Date">
            <DatePicker
              data-testid="date"
              className="w-[13rem]"
              format="DD.MM.YYYY"
              onChange={(date, dateString) => {
                setEvDateValue(dateString);
              }}
              defaultValue={dayjs(currentEvDateValue, "DD.MM.YYYY")}
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
