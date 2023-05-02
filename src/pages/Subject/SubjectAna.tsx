import React from "react";
import { useState, useEffect } from "react";
import Accordion from "./Accordion";
import axios from "axios";
import "./SubjectAna.css";
import { Modal, Button, Input } from "antd";

import { useSearchParams } from "react-router-dom";
import EvalPieChart from "./PieChart";
import EvalComponentDescription from "./EvalComponentDescription";

interface MyVerticallyCenteredModalProps {
  title: string;
  description: string;
  modalShow: boolean;
  setModalShow: (show: boolean) => void;
  setDescription: (description: string) => void;
  subject: any;
}

const MyVerticallyCenteredModal: React.FC<MyVerticallyCenteredModalProps> = (
  props
) => {
  const [inputDescription, setInputDescription] = useState(props.description);
  const [editing, setEditing] = useState(false);

  const handleOk = () => {
    props.setDescription(inputDescription);
    props.setModalShow(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    //props.setDescription(inputDescription);
    setEditing(false);
    props.subject.description = inputDescription;
    console.log(props.subject);
    const result = await axios.put(
      `http://localhost:8090/api/v1/subjects/subjectTitle=${props.subject.title}`,
      props.subject
    );
    //setInputDescription(props.subject.description);
  };

  return (
    <Modal
      data-testid="course-modal"
      open={props.modalShow}
      onCancel={() => props.setModalShow(false)}
      centered
      footer={
        editing
          ? [
              <Button key="close" onClick={() => setEditing(false)}>
                Close
              </Button>,
              <Button
                data-testid="save-modal"
                key="save"
                type="default"
                onClick={handleSave}
              >
                Save
              </Button>,
            ]
          : [
              <Button
                data-testid="close-modal"
                key="close"
                onClick={() => props.setModalShow(false)}
              >
                Close
              </Button>,
              <Button
                data-testid="edit-modal"
                key="edit"
                type="default"
                onClick={handleEdit}
              >
                Edit
              </Button>,
            ]
      }
    >
      <h2 className="modal-title">{props.title}</h2>
      {editing ? (
        <Input.TextArea
          data-testid="input-description"
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
          placeholder="Enter description"
          autoSize={{ minRows: 4, maxRows: 8 }}
        />
      ) : (
        <p>{props.description}</p>
      )}
    </Modal>
  );
};

const Course: React.FC<MyVerticallyCenteredModalProps> = (props) => {
  return (
    <div>
      <h1 style={{ fontWeight: 600, fontSize: 20 }}>{props.title}</h1>
      <p className="course-description">
        {props.description.substring(0, 500)}...
      </p>
      <p
        data-testid="more description"
        onClick={() => props.setModalShow(true)}
        style={{ textDecoration: "none", cursor: "pointer" }}
      >
        View Full Description
      </p>
    </div>
  );
};

function SubjectAna() {
  const [modalShow, setModalShow] = useState(false);
  const title = "Course Title";
  const [description, setDescription] = useState<string>("");
  const [subject, setSubject] = useState<any>();

  const [searchParams] = useSearchParams();
  const [subjectTitle, setSubjectTitle] = useState<string>(
    searchParams.get("subject")!
  );
  const [accordionData, setAccordionData] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get<any>(
        `http://localhost:8090/api/v1/subjects/subjectTitle=${subjectTitle}`
      );
      setSubject(result.data);
      const accData = result.data.components.map((component: any) => {
        return component.type;
      });
      setAccordionData(accData);
      setDescription(result.data.description);
    };
    fetchData();
  }, [subject]);

  return (
    <div className="app-container">
      <div className="main-container">
        <h1 className="title-container">{subjectTitle}</h1>
        <div className="main-content">
          <img
            data-testid="image"
            src="https://profs.info.uaic.ro/~adiftene/Scoala/2022/IP/Img/Amazon_Learn_and_Earn.jpg"
            alt="Couse image"
            className="img"
          />
          <div data-testid="subjectAna-1">
            <Course
              title={`${subjectTitle} description`}
              description={description!}
              modalShow={modalShow}
              setModalShow={setModalShow}
              setDescription={setDescription}
              subject={subject}
            />
            <MyVerticallyCenteredModal
              //data-testid="modal-course-description"
              title={title}
              description={description!}
              modalShow={modalShow}
              setModalShow={setModalShow}
              setDescription={setDescription}
              subject={subject}
            />
          </div>
          <div className="evaluation-container">
            <h1 className="evaluation-title">Evaluation</h1>
            <div className="evaluation-body">
              <div className="evaluation-text">
                <EvalComponentDescription
                  title={`TEST`}
                  description={description!}
                  subject={subject}
                  type="exam"
                  modalShow={modalShow}
                  setModalShow={setModalShow}
                  setDescription={setDescription}
                />
              </div>
              <div className="evaluation-piechart">
                <EvalPieChart />
              </div>
            </div>
          </div>
          <div className="material-container">
            <h1>Resources</h1>
            <Accordion components={accordionData} title={subjectTitle} />
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export { Course, MyVerticallyCenteredModal };
export default SubjectAna;
