import axios from "axios";
import CardGrid from "./CardGrid";
import React, { useEffect, useState } from "react";
import "./SubjectAlex.css";

interface Subject {
  id: number;
  title: string;
  description: string;
  year: number;
  semester: number;
  credits: number;
}

function SubjectAlex() {
  const [cards, setCards] = useState<Subject[]>([]);
  const [isModified, setIsModified] = useState<boolean>(false);

  const fetchData = () => {
    console.log("fetching data");
    axios
      .get<Subject[]>(`http://localhost:8090/api/v1/subjects`)
      .then((response) => response.data)
      .then((data) => {
        setCards(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, [isModified]);

  return (
    <>
      <div className="=app-container">
        <CardGrid
          cards={cards}
          setCards={setCards}
          isModified={isModified}
          setIsModified={setIsModified}
        />
      </div>
    </>
  );
}

export default SubjectAlex;
