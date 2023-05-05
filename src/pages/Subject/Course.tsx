import React from "react";

interface MyVerticallyCenteredModalProps {
  title: string;
  description: string;
  modalShow: boolean;
  setModalShow: (show: boolean) => void;
  setDescription: (description: string) => void;
  subject: any;
}

const Course: React.FC<MyVerticallyCenteredModalProps> = (props) => {
  return (
    <div>
      <h1 style={{ fontWeight: 600, fontSize: 20 }}>{props.title}</h1>
      <p //className="course-description"
        className="items-center max-w-sm:150px  max-w-md:300px  max-w-lg:400px"
      >
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

export default Course;
