import { useState, useEffect } from "react";
import Accordion from "./Accordion";
import axios from "axios";
//import "./SubjectAna.css";
import { useSearchParams } from "react-router-dom";
import EvalPieChart from "./PieChart";
import Course from "./Course";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";

let [evaluationsArray, setEvaluationsArray] = [[], []];

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

  const [isModified, setIsModified] = useState<boolean>(false);

  const [imgSrc, setImgSrc] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get<any>(
        `http://localhost:8090/api/v1/subjects/subjectTitle=${subjectTitle}`
      );
      setSubject(result.data);
      setDescription(result.data.description);

      if (!result.data.image) {
        setImgSrc(
          "https://blog.planview.com/wp-content/uploads/2020/01/Top-6-Software-Development-Methodologies.jpg"
        );
      } else {
        const img = await axios.get(
          `http://localhost:8090/api/v1/subjects/subjectTitle=${subjectTitle}/image`,
          { responseType: "arraybuffer" }
        );
        const imgBlob = new Blob([img.data], { type: result.data.image.type });
        const imgUrl = URL.createObjectURL(imgBlob);
        setImgSrc(imgUrl);
      }

      const resultComponents = await axios.get<any>(
        `http://localhost:8090/api/v1/subjects/${subjectTitle}/components`
      );
      const accData = resultComponents.data.map((component: any) => {
        return component.type;
      });
      setAccordionData(accData);
      evaluationsArray = result.data.evaluations;
      // console.log(result.data.evaluations);
    };
    fetchData();
  }, [isModified]);

  return (
    <div //className="app-container"
    >
      <div //className="main-container"
        className="py-4 pb-20"
      >
        <h1 //className="title-container"
          className="text-4xl mt-6 text-center mb-12 font-bold"
        >
          {subjectTitle}
        </h1>
        <div //className="main-content"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 gap-32 mg:grid-cols-2 lg:grid-cols-2 items-center  shadow shadow hover:shadow-inner">
            <img
              data-testid="image"
              src={imgSrc}
              alt="Couse image"
              //className="img"
              className=" w-full row-start-1"
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
                isModified={isModified}
                setIsModified={setIsModified}
              />
            </div>
          </div>
          <div //className="evaluation-container"
            className="grid grid-cols-1 justify-center mt-20 items-center shadow shadow hover:shadow-inner mb-20"
          >
            <h1 //className="evaluation-title"
              className="grid items-center justify-center content-center text-2xl font-bold"
            >
              Evaluation
            </h1>
            <div
              // className="evaluation-piechart"
              className="block max-h-fit"
            >
              <EvalPieChart />
            </div>
          </div>
          <div //className="material-container"
            className="grid grid-rows-max justify-self-start px-10 shadow shadow hover:shadow-inner"
          >
            <h1 className="grid mb-10 items-center justify-center content-center text-2xl font-bold">
              Resources
            </h1>
            <Accordion
              components={accordionData}
              title={subjectTitle}
              isModified={isModified}
              setIsModified={setIsModified}
            />
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export { evaluationsArray };
export default SubjectAna;
