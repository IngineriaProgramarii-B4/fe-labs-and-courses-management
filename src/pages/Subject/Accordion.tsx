import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Collapse, Modal, Input, Form, Select, InputNumber } from "antd";
import ResourcesTable from "./ResourcesTable";
import { v4 } from "uuid";

const { Panel } = Collapse;
const { TextArea } = Input;

interface AccordionProps {
  components: string[];
  title: string;
  isModified: boolean;
  setIsModified: (isModified: boolean) => void;
  role: string;
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
        `http://localhost:8082/api/v1/subjects/${props.title}/components`,
        newComponent,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (percentage !== 0 && evalDescription !== "") {
        const newEvaluation = {
          component: chosenComponent,
          description: evalDescription,
          value: percentage,
        };
        await axios.post(
          `http://localhost:8082/api/v1/subjects/${props.title}/evaluationMethods`,
          newEvaluation,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
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
    hideAddModal();
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
        `http://localhost:8082/api/v1/subjects/${props.title}/components/type=${componentToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      props.setIsModified(props.isModified ? false : true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div data-testid="accordion-1">
      {comps.length < 3
        ? props.role === "TEACHER"
          ? [
              <FontAwesomeIcon
                data-testid="add-button"
                onClick={showAddModal}
                icon={faPlus}
                className="mb-10 px-10 hover:text-blue-500"
                size="2x"
                key={v4()}
              />,
            ]
          : []
        : /*<Button
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
              {props.role === "TEACHER" ? (
                <div key={v4()}>
                  <FontAwesomeIcon
                    data-testid="delete"
                    onClick={() => {
                      setComponentToDelete(component);
                      showModal2();
                    }}
                    icon={faTrash}
                    className="mb-10 px-10 float-right hover:text-red-500 "
                    size="2x"
                    key={v4()}
                  />
                  <Modal
                    open={isModalOpen2}
                    onOk={() => {
                      deleteComponent();
                      setIsModalOpen2(false);
                    }}
                    onCancel={handleCancel}
                    okType="danger"
                    okText="Yes"
                    cancelText="No"
                    closable={false}
                    key={v4()}
                  >
                    <div
                      className="font-bold text-center mb-5 text-xl"
                      key={v4()}
                    >
                      <ExclamationCircleFilled
                        className="text-yellow-500 mr-4 text-2xl"
                        key={v4()}
                      />
                      Are you sure you wish to delete this component?
                    </div>
                    <div className="text-center" key={v4()}>
                      You can't revert your actions
                    </div>
                  </Modal>
                </div>
              ) : null}

              <ResourcesTable
                component={component}
                title={props.title}
                role={props.role}
                key={v4()}
              />
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
        onOk={() => {
          saveComponent();
          hideAddModal();
        }}
        okText="Add"
      >
        <Form>
          <Form.Item label="Component Type" htmlFor="typeInput" required>
            <Select
              id="typeInput"
              data-testid="type-input"
              placeholder="Select a component"
              value={chosenComponent === "" ? undefined : chosenComponent}
              onChange={(value) => setChosenComponent(value)}
            >
              {possibleComponents.map((component) => {
                return (
                  <Select.Option value={component} key={v4()}>
                    {component}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Number of Weeks"
            htmlFor="numberOfWeeksInput"
            required
          >
            <Input
              id="numberOfWeeksInput"
              placeholder="Number of weeks"
              value={numberOfWeeks === 0 ? undefined : numberOfWeeks}
              onChange={(e: any) => setNumberOfWeeks(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Percentage of Final Grade"
            htmlFor="PercentageOfFinalGradeInput"
            required
          >
            <InputNumber
              id="PercentageOfFinalGradeInput"
              value={percentage === 0 ? 0 : percentage}
              step={0.01}
              min={0.01}
              max={1}
              onChange={(value: any) => setPercentage(value)}
            />
          </Form.Item>
          <Form.Item
            label="Evaluation Description"
            htmlFor="DescriptionInput"
            required
          >
            <Input.TextArea
              id="DescriptionInput"
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
