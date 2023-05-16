import axios from "axios";
import SubjectForm from "./SubjectForm";
import React, { useState } from "react";
import { Button, Modal, UploadFile } from "antd";

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
  isModified: boolean;
  setIsModified: (isModified: boolean) => void;
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
  const [upFile, setUpFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleFileUpload = async () => {
    try {
      if (!upFile) return;
      const formData = new FormData();
      formData.append("image", upFile as Blob);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const res = await axios.put(
        `http://localhost:8082/api/v1/subjects/subjectTitle=${titleForm}/image`,
        formData,
        config
      );
      console.log(res);
      setFileList([]);
    } catch (err) {
      console.log(err);
    }
  };

  const submitSubject = async () => {
    const subject = {
      title: titleForm,
      description: descriptionForm,
      year: yearForm,
      semester: semesterForm,
      credits: creditsForm,
      components: [],
      evaluations: [],
    };
    if (props.action === "add") {
      try {
        if (!upFile) return;
        await axios.post("http://localhost:8082/api/v1/subjects", subject);
        await handleFileUpload();
        props.setIsModified(props.isModified ? false : true);
      } catch (error) {
        console.log(error);
      }
    } else if (props.action === "edit") {
      try {
        await axios.put(
          `http://localhost:8082/api/v1/subjects/subjectTitle=${props.title}`,
          subject
        );
        if (upFile) await handleFileUpload();
        props.setIsModified(props.isModified ? false : true);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
              console.log("Cancel");
              setTitleForm(props.title);
              setDescriptionForm(props.description);
              setYearForm(props.year);
              setSemesterForm(props.semester);
              setCreditsForm(props.credits);
              setResetFields(resetFields ? false : true);
              setUpFile(null);
              setFileList([]);
              props.setSubjectModal(false);
            }}
          >
            Cancel
          </Button>,

          <Button
            className="bg-buttonBlue hover:bg-hoverBlue"
            key="submit"
            type="primary"
            onClick={() => {
              submitSubject();
              setTitleForm(props.title);
              setDescriptionForm(props.description);
              setYearForm(props.year);
              setSemesterForm(props.semester);
              setCreditsForm(props.credits);
              setResetFields(resetFields ? false : true);
              props.setSubjectModal(false);
            }}
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
          upFile={upFile}
          setUpFile={setUpFile}
          fileList={fileList}
          setFileList={setFileList}
        />
      </Modal>
    </>
  );
};

export default FormModal;
