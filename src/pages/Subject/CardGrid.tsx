import axios from "axios";
import "./SubjectAlex.css";
import SubjectCard from "./SubjectCard";
import AddSubjectCard from "./AddSubjectCard";
import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { Row, Col } from "antd";
import PhotoUpload from "./PhotoUpload";
const { TextArea } = Input;
const { Meta } = Card;

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
    <div className="container cardgrid">
      {cardGrid.map((card) => (
        <div className="card-wrapper" key={card.id}>
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
