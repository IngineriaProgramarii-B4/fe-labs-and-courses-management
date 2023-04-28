import React from "react";
import { useState } from "react";
import { Modal, Button } from "antd";
import styles from "../Catalog.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DeleteGrade(props: {
  id: number;
  fetchGrades: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteGrade = (id: number) => {
    fetch(`http://localhost:8081/api/v1/catalog/students/1/grades/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        props.fetchGrades();
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {/* <img
        src={require("../../../img/trash.png")}
        alt="trash_img"
        className={styles.trash_img}
        onClick={() => {
          showModal();
        }}
      /> */}
      <div
        data-testId="trash_img"
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
        <p>Are you sure you want to delete this grade?</p>
        <Button
          danger={true}
          onClick={() => {
            handleDeleteGrade(props.id);
            setIsModalOpen(false);
          }}
        >
          Delete
        </Button>
      </Modal>
    </>
  );
}
