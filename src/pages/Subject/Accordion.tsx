import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Collapse, Modal, Input, Form, Select, Popconfirm } from "antd";
import ResourcesTable from "./ResourcesTable";
//import "./Accordion.css";
const { Panel } = Collapse;

interface AccordionProps {
  components: string[];
  title: string;
  isModified: boolean;
  setIsModified: (isModified: boolean) => void;
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
      resources: [],
    };
    try {
      await axios.post(
        `http://localhost:8090/api/v1/subjects/${props.title}/components`,
        newComponent
      );
      props.setIsModified(props.isModified ? false : true);
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
      props.setIsModified(props.isModified ? false : true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div data-testid="accordion-1">
      {comps.length < 3 ? (
        <FontAwesomeIcon
          data-testid="add-button"
          onClick={showAddModal}
          icon={faPlus}
          className="mb-10 px-10 hover:text-blue-500"
          size="2x"
        />
      ) : /*<Button
          data-testid="add-button"
          //className="add-button second"
          className="bg-blue-500 hover:bg-blue-600 text-white mb-12 mt-4"
          type="primary"
          onClick={showAddModal}
        >
          Add Component
        </Button>
        */
      null}

      <Collapse accordion={true} ghost>
        {comps.map((component) => {
          return (
            <Panel header={component} key={component}>
              <Popconfirm
                // okButtonProps={{ className: "okbutton" }}
                okButtonProps={{
                  className: "bg-blue-500 hover:bg-blue-600 text-white",
                }}
                title="Sure to delete?"
                onConfirm={() => {
                  deleteComponent();
                }}
              >
                <FontAwesomeIcon
                  onClick={() => setComponentToDelete(component)}
                  icon={faTrash}
                  className="mb-10 px-10 float-right hover:text-red-500 "
                  size="2x"
                />
              </Popconfirm>
              <ResourcesTable component={component} title={props.title} />
            </Panel>
          );
        })}
      </Collapse>

      <Modal
        data-testid="modal"
        title="Add Component"
        // okButtonProps={{ className: "okbutton" }}
        okButtonProps={{
          className: "bg-blue-500 hover:bg-blue-600 text-white",
        }}
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
