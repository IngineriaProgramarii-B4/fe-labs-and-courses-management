
import SubjectCard from "./SubjectCard";
import AddSubjectCard from "./AddSubjectCard";
import React, { useState, useEffect } from "react";
interface Subject {
  id: number;
  title: string;
  description: string;
  year: number;
  semester: number;
  credits: number;
}

interface CardGridProps {
  cards: Subject[];
  setCards: (cards: Subject[]) => void;
  isModified: boolean;
  setIsModified: (isModified: boolean) => void;
}

const CardGrid: React.FC<CardGridProps> = (props) => {
  const [cardGrid, setCardGrid] = useState<Subject[]>(props.cards);

  useEffect(() => {
    setCardGrid(props.cards);
  }, [props.cards]);

  return (
    //<div className="container cardgrid">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 py-8 items-center text-center">
      {cardGrid.map((card) => (
        // <div className="card-wrapper" key={card.id}>
        <div
          className=" grid content-center justify-center items-center"
          key={card.id}
        >
          <div data-testid="subject-card">
            <SubjectCard
              card={card}
              isModified={props.isModified}
              setIsModified={props.setIsModified}
            />
          </div>
        </div>
      ))}
      <AddSubjectCard
        isModified={props.isModified}
        setIsModified={props.setIsModified}
      />
    </div>
  );
};

export default CardGrid;
