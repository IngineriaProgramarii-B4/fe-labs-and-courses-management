import axios from "axios";
import FormModal from "./FormModal";
import { ExclamationCircleFilled } from "@ant-design/icons";
import React, { useState } from "react";
import { Card, Button, Modal } from "antd";
const { Meta } = Card;
const { confirm } = Modal;

interface Subject {
  id: number;
  title: string;
  description: string;
  year: number;
  semester: number;
  credits: number;
}

interface SubjectCardProps {
  card: Subject;
}

const SubjectCard: React.FC<SubjectCardProps> = (props) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [SubjectModal, setSubjectModal] = useState(false);

  const handleClick = (title: string) => {
    window.location.href = `http://localhost:3000/subjectana?subject=${title}`;
  };

  const handleEditClick = (event: any, card: Subject) => {
    event.stopPropagation();
    editSubjectModal(card);
  };

  const editSubjectModal = (subject: Subject) => {
    setSelectedSubject(subject);
    setSubjectModal(true);
  };

  const handleDeleteClick = (event: any, title: string) => {
    event.stopPropagation();
    showDeleteConfirm(title);
  };

  const showDeleteConfirm = (title: string) => {
    confirm({
      title: "Are you sure you wish to delete this subject?",
      icon: <ExclamationCircleFilled />,
      content: "You can't revert your actions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
        axios.delete(
          `http://localhost:8090/api/v1/subjects/subjectTitle=${title}`
        );
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <Card
        onClick={() => handleClick(props.card.title)}
        hoverable
        cover={
          <img
            alt={props.card.title}
            src={
              "https://blog.planview.com/wp-content/uploads/2020/01/Top-6-Software-Development-Methodologies.jpg"
            }
          />
        }
        actions={[
          <Button
            data-testid="edit-button"
            type="text"
            key="edit"
            onClick={(event) => {
              //initializeSubjecEditProperties(props.card.title);
              handleEditClick(event, props.card);
            }}
          >
            Edit
          </Button>,
          <Button
            type="text"
            key="delete"
            onClick={(event) => handleDeleteClick(event, props.card.title)}
          >
            Delete
          </Button>,
        ]}
        style={{ width: 300 }}
      >
        <Meta
          title={props.card.title}
          description={props.card.description.substring(0, 100)}
        />
      </Card>
      <FormModal
        SubjectModal={SubjectModal}
        setSubjectModal={setSubjectModal}
        modalTitle="Edit Subject"
        action="edit"
        title={props.card.title}
        description={props.card.description}
        year={props.card.year}
        semester={props.card.semester}
        credits={props.card.credits}
      />
    </>
  );
};

export default SubjectCard;
