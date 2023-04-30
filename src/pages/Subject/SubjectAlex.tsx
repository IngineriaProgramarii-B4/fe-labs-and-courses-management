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

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get<Subject[]>(
        `http://localhost:8090/api/v1/subjects`
      );
      setCards(result.data);
    };
    fetchData();
  }, [cards]);

  return (
    <>
      <div className="=app-container">
        <CardGrid cards={cards} setCards={setCards} />
      </div>
    </>
  );
}

export default SubjectAlex;
