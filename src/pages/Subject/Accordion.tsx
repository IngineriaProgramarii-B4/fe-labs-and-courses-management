import axios from "axios";
//Import Ant Components
import React, { useEffect, useState } from "react";
import { Collapse, Button, Modal, Input, Form, Select, Popconfirm } from "antd";

import "./Accordion.css"; // Import the CSS file for styling

import ResourcesTable from "./ResourcesTable";
import { Components } from "antd/es/date-picker/generatePicker";

const { Panel } = Collapse;

interface AccordionProps {
  components: string[];
  title: string;
}

const Accordion: React.FC<AccordionProps> = (props) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [possibleComponents, setPossibleComponents] = useState<string[]>([]);
  const [chosenComponent, setChosenComponent] = useState<string>("");
  const [numberOfWeeks, setNumberOfWeeks] = useState<number>(0);
  const [componentToDelete, setComponentToDelete] = useState<string>("");
  const [comps, setComps] = useState<string[]>([]);

  useEffect(() => {
    setComps(props.components);
  }, [props.components]);

  const showAddModal = () => {
    const allComponents = ["Course", "Seminar", "Laboratory"];
    const newComponents = allComponents.filter((component) => {
      return !props.components.includes(component);
    });
    setPossibleComponents(newComponents);
    setIsAddModalOpen(true);
  };

  const hideAddModal = () => {
    setIsAddModalOpen(false);
  };

  const saveComponent = async () => {
    const newComponent = {
      type: chosenComponent,
      numberWeeks: numberOfWeeks,
    };
    try {
      await axios.post(
        `http://localhost:8090/api/v1/subjects/${props.title}/components`,
        newComponent
      );
      props.components.push(chosenComponent);
      setChosenComponent("");
      setNumberOfWeeks(0);
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComponent = async () => {
    try {
      await axios.delete(
        `http://localhost:8090/api/v1/subjects/${props.title}/components/type=${componentToDelete}`
      );
      props.components.splice(props.components.indexOf(componentToDelete), 1);
      console.log(props.components);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div data-testid="accordion-1">
      <Collapse className="main-accordion" accordion={true} ghost>
        {comps.map((component) => {
          return (
            <Panel header={component} key={component}>
              <Popconfirm
                okButtonProps={{ className: "okbutton" }}
                title="Sure to delete?"
                onConfirm={() => {
                  deleteComponent();
                }}
              >
                <Button
                  className="add-button"
                  type="primary"
                  onClick={() => setComponentToDelete(component)}
                >
                  Delete Component
                </Button>
              </Popconfirm>
              <ResourcesTable component={component} title={props.title} />
            </Panel>
          );
        })}
      </Collapse>
      {comps.length < 3 ? (
        <Button
          data-testid="add-button"
          className="add-button second"
          type="primary"
          onClick={showAddModal}
        >
          Add Component
        </Button>
      ) : null}

      <Modal
        data-testid="modal"
        title="Add Component"
        okButtonProps={{ className: "okbutton" }}
        open={isAddModalOpen}
        onCancel={hideAddModal}
        onOk={saveComponent}
        okText="Add"
      >
        <Form>
          <Form.Item label="Component Type">
            <Select
              placeholder="Select a component"
              value={chosenComponent === "" ? undefined : chosenComponent}
              onChange={(value) => setChosenComponent(value)}
            >
              {possibleComponents.map((component) => {
                return (
                  <Select.Option value={component}>{component}</Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Number of Weeks">
            <Input
              placeholder="Number of weeks"
              value={numberOfWeeks === 0 ? undefined : numberOfWeeks}
              onChange={(e: any) => setNumberOfWeeks(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Accordion;
