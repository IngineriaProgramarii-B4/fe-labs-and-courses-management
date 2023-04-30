import SubjectForm from "./SubjectForm";
import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Row, Col, Select } from "antd";
const { TextArea } = Input;

interface FormModalProps {
  SubjectModal: boolean;
  setSubjectModal: (SubjectModal: boolean) => void;
  modalTitle: string;
  action: string;
  title: string;
  description: string;
  year: number;
  semester: number;
  credits: number;
}

const FormModal: React.FC<FormModalProps> = (props) => {
  const [titleForm, setTitleForm] = useState<string>(props.title);
  const [descriptionForm, setDescriptionForm] = useState<string>(
    props.description
  );
  const [yearForm, setYearForm] = useState<number>(props.year);
  const [semesterForm, setSemesterForm] = useState<number>(props.semester);
  const [creditsForm, setCreditsForm] = useState<number>(props.credits);
  const [resetFields, setResetFields] = useState<boolean>(false);

  return (
    <>
      <Modal
        title={props.modalTitle}
        open={props.SubjectModal}
        onCancel={() => props.setSubjectModal(false)}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setTitleForm(props.title);
              setDescriptionForm(props.description);
              setYearForm(props.year);
              setSemesterForm(props.semester);
              setCreditsForm(props.credits);
              setResetFields(resetFields ? false : true);
              props.setSubjectModal(false);
            }}
          >
            Cancel
          </Button>,

          <Button
            key="submit"
            type="default"
            onClick={() => props.setSubjectModal(false)}
          >
            Submit
          </Button>,
        ]}
      >
        <SubjectForm
          action={props.action}
          title={titleForm}
          setTitle={setTitleForm}
          description={descriptionForm}
          setDescription={setDescriptionForm}
          year={yearForm}
          setYear={setYearForm}
          semester={semesterForm}
          setSemester={setSemesterForm}
          credits={creditsForm}
          setCredits={setCreditsForm}
          resetFields={resetFields}
        />
      </Modal>
    </>
  );
};

export default FormModal;
