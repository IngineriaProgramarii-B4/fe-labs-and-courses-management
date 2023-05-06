import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Collapse, Modal, Input, Form, Select, InputNumber } from "antd";
import ResourcesTable from "./ResourcesTable";
//import "./Accordion.css";
const { Panel } = Collapse;
const { TextArea } = Input;

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
  const [percentage, setPercentage] = useState<number>(0);
  const [evalDescription, setEvalDescription] = useState<string>("");

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
    setPercentage(0);
    setEvalDescription("");
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

      if (percentage !== 0 && evalDescription !== "") {
        const newEvaluation = {
          component: chosenComponent,
          description: evalDescription,
          value: percentage,
        };
        await axios.post(
          `http://localhost:8090/api/v1/subjects/${props.title}/evaluationMethods`,
          newEvaluation
        );
        setPercentage(0);
        setEvalDescription("");
      }

      props.setIsModified(props.isModified ? false : true);
      setChosenComponent("");
      setNumberOfWeeks(0);
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen2(false);
  };
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const showModal2 = () => {
    setIsModalOpen2(true);
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
              <div>
                <FontAwesomeIcon
                  onClick={() => {
                    setComponentToDelete(component);
                    showModal2();
                  }}
                  icon={faTrash}
                  className="mb-10 px-10 float-right hover:text-red-500 "
                  size="2x"
                />
                <Modal
                  visible={isModalOpen2}
                  onOk={() => {
                    deleteComponent();
                    setIsModalOpen2(false);
                  }}
                  onCancel={handleCancel}
                  okType="danger"
                  okText="Yes"
                  cancelText="No"
                  closable={false}
                >
                  <div className="font-bold text-center mb-5 text-xl">
                    <ExclamationCircleFilled className="text-yellow-500 mr-4 text-2xl" />
                    Are you sure you wish to delete this resource?
                  </div>
                  <div className="text-center">
                    You can't revert your actions
                  </div>
                </Modal>
              </div>

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
          className: "bg-buttonBlue hover:bg-hoverBlue",
          style: { color: "white" },
        }}
        open={isAddModalOpen}
        onCancel={hideAddModal}
        onOk={saveComponent}
        okText="Add"
      >
        <Form>
          <Form.Item label="Component Type" required={true}>
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
          <Form.Item label="Number of Weeks" required={true}>
            <Input
              placeholder="Number of weeks"
              value={numberOfWeeks === 0 ? undefined : numberOfWeeks}
              onChange={(e: any) => setNumberOfWeeks(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Percentage of Final Grade" required={false}>
            <InputNumber
              value={percentage === 0 ? 0 : percentage}
              step={0.01}
              min={0.01}
              max={1}
              onChange={(value: any) => setPercentage(value)}
            />
          </Form.Item>
          <Form.Item label="Evaluation Description" required={false}>
            <TextArea
              rows={4}
              value={evalDescription === "" ? undefined : evalDescription}
              onChange={(e: any) => setEvalDescription(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Accordion;
