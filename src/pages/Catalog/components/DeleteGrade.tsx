import React from "react";
import { useState } from "react";
import { Modal, Button } from "antd";

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
    fetch(`http://localhost:8081/api/v1/catalog/students/8/grades/${id}`, {
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
      <img
        src={require("../../../img/trash.png")}
        alt="trash-img"
        className="trash-img"
        onClick={() => {
          showModal();
        }}
      />
      <Modal
        title="Delete Grade"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        centered={true}
        width={400}
      >
        <Button danger={true} onClick={() => handleDeleteGrade(props.id)}>
          Delete
        </Button>
      </Modal>
    </>
  );
}
