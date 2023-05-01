import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";


interface EvaluationProps {
    title: string;
    description: string;
    subject: any;
    type: string;
    modalShow: boolean;
    setDescription: (description: string) => void;
    setModalShow: (show: boolean) => void;
  }

  const EvalDescription: React.FC<EvaluationProps> = (props) => {
    return (
      <div>
        <h1 style={{ fontWeight: 600, fontSize: 20 }}>{props.title}</h1>
        <p className="course-description"
           onClick={() => props.setModalShow(true)}>
          {props.description}
        </p>
      </div>
    );
  };


function EvalComponentDescription(props : any) {
    const [modalShow, setModalShow] = useState(false);
    const title = "Component Title";
    const [description, setDescription] = useState<string>("");
    const [subject, setSubject] = useState<any>();
    const [type, setType] = useState<string>("");

    const [searchParams] = useSearchParams();
    const [subjectTitle, setSubjectTitle] = useState<string>(
        searchParams.get("subject")!
    );

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get<any>(
                `http://localhost:8090/api/v1/subjects/${subjectTitle}/evaluationMethods`
            );
            setSubject(result.data);
            setDescription(result.data.description);
            };
            fetchData();
        });
    
    return (
        <div className="evaluation-description">
            <EvalDescription
                title={title}
                description={description}
                subject={subject}
                type={type}
                modalShow={modalShow}
                setDescription={setDescription}
                setModalShow={setModalShow}
            />
        </div>
    );
}

export default EvalComponentDescription;