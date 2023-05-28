import axios from "axios";
import FormModal from "./FormModal";
import { ExclamationCircleFilled } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "antd";
import { v4 } from "uuid";
const { Meta } = Card;
const { confirm } = Modal;

interface Subject {
  id: number;
  title: string;
  description: string;
  year: number;
  semester: number;
  credits: number;
  hoursOfStudy: number;
}

interface SubjectCardProps {
  card: Subject;
  isModified: boolean;
  setIsModified: (isModified: boolean) => void;
  role: String;
}

const SubjectCard: React.FC<SubjectCardProps> = (props) => {
  const [SubjectModal, setSubjectModal] = useState(false);
  const [cardImg, setCardImg] = useState<string>("");

  /*  console.log(props.role);*/
  const handleClick = (title: string) => {
    window.location.href = `http://localhost:3000/selectedsubject?subject=${title}`;
  };

  const handleEditClick = (event: any, card: Subject) => {
    event.stopPropagation();
    editSubjectModal(card);
  };

  const editSubjectModal = (subject: Subject) => {
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
          `http://localhost:8082/api/v1/subjects/subjectTitle=${title}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        props.setIsModified(props.isModified ? false : true);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const getImage = async (title: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/subjects/subjectTitle=${title}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.data.image) {
        setCardImg(
          "https://blog.planview.com/wp-content/uploads/2020/01/Top-6-Software-Development-Methodologies.jpg"
        );
        return;
      }
      const img = await axios.get(
        `http://localhost:8082/api/v1/subjects/subjectTitle=${title}/image`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "arraybuffer",
        }
      );
      const imgBlob = new Blob([img.data], { type: response.data.image.type });
      const imgUrl = URL.createObjectURL(imgBlob);
      setCardImg(imgUrl);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getImage(props.card.title);
  }, [props.card]);

  return (
    <>
      <Card
        onClick={() => handleClick(props.card.title)}
        hoverable
        cover={
          <div>
            <img alt={props.card.title} src={cardImg} className="w-full h-52" />
          </div>
        }
        actions={[
          props.role === "TEACHER"
            ? [
                <Button
                  data-testid="edit-button"
                  type="text"
                  key={v4()}
                  onClick={(event) => {
                    handleEditClick(event, props.card);
                  }}
                >
                  Edit
                </Button>,
                <Button
                  type="text"
                  key={v4()}
                  onClick={(event) =>
                    handleDeleteClick(event, props.card.title)
                  }
                >
                  Delete
                </Button>,
              ]
            : [],
        ]}
        style={{ width: 300 }}
      >
        <Meta
          title={props.card.title}
          description={
            <div>
              <p>{`Year: ${props.card.year}`}</p>
              <p>{`Semester: ${props.card.semester}`}</p>
              <p>{`Credits: ${props.card.credits}`}</p>
              <p>{`Estimated time to study: ${props.card.hoursOfStudy}h`}</p>
            </div>
          }
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
        isModified={props.isModified}
        setIsModified={props.setIsModified}
        key={v4()}
      />
    </>
  );
};

export default SubjectCard;
