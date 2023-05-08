import React, { useState } from "react";
import { Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./SubjectAlex.css";
import FormModal from "./FormModal";

const { Meta } = Card;

interface AddSubjectCardProps {
  isModified: boolean;
  setIsModified: (isModified: boolean) => void;
}

const AddSubjectCard: React.FC<AddSubjectCardProps> = (props) => {
  const [SubjectModal, setSubjectModal] = useState(false);

  return (
    <>
      <div className="card-wrapper add-card" data-testid="add-card-button">
        <Card
          onClick={() => setSubjectModal(true)}
          hoverable
          style={{ width: 240, padding: 40 }}
          cover={
            <div className="add-card-cover" data-testid="add-card-outline">
              <PlusOutlined style={{ fontSize: 40 }} />
            </div>
          }
        >
          <Meta
            title={
              <div
                className="card-meta-title"
                data-testid="add-card-title"
                style={{ fontSize: 13 }}
              >
                Add a new subject
              </div>
            }
          />
        </Card>
        <FormModal
          SubjectModal={SubjectModal}
          setSubjectModal={setSubjectModal}
          modalTitle="Add a new subject"
          action="add"
          isModified={props.isModified}
          setIsModified={props.setIsModified}
          title=""
          description=""
          year={1}
          semester={1}
          credits={1}
        />
      </div>
    </>
  );
};

export default AddSubjectCard;
