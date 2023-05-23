import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import styles from "../Catalog.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

export default function DeleteGrade(props: {
  id: number;
  fetchGrades: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const { id } = useParams();
  // console.log("id: ", id);
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
    // console.log(storedToken);
  }, []);

  const handleDeleteGrade = (gradeId: number) => {
    fetch(`http://localhost:8082/api/v1/students/${id}/grades/${gradeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
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
