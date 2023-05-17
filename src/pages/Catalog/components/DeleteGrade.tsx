import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import styles from "../Catalog.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DeleteGrade(props: {
  id: number;
  fetchGrades: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    console.log(storedToken);
  }, []);

  const handleDeleteGrade = (id: number) => {
    fetch(
      `http://localhost:8082/api/v1/students/c6189cad-7d76-4f9c-995b-6694f7c40964/grades/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        props.fetchGrades();
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div
        data-testid="trash_img"
        className={styles.trash_img}
        onClick={() => {
          showModal();
        }}
      >
        <FontAwesomeIcon icon={faTrash} style={{ color: "#ff7878" }} />
      </div>
      <Modal
        title="Delete Grade"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        centered={true}
        width={400}
      >
        <p className={styles.delete_grade_text}>
          Are you sure you want to delete this grade?
        </p>
        <div className={styles.action_btn}>
          <Button
            danger={true}
            onClick={() => {
              handleDeleteGrade(props.id);
              setIsModalOpen(false);
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}
