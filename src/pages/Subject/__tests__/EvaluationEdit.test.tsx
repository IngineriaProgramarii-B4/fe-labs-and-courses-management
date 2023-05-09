import { render, waitForElementToBeRemoved } from "@testing-library/react";
import EvaluationEdit from "../EvaluationEdit";
import { fireEvent, screen } from "@testing-library/react";
import axios from "axios";

test("renders EvaluationEdit component without crashing", async() => {
    const setIsModified = jest.fn();
    const setIsVisibile = jest.fn();
    const setResetFields = jest.fn();
    render(
      <EvaluationEdit
        subjectTitle="Math"
        title="Course"
        isModified={false}
        setIsModified={setIsModified}
        description="Exam"
        value={0.5}
        isVisible={true}
        setIsVisible={setIsVisibile}
        resetFields={false}
        setResetFields={setResetFields}
      />
    );
    fireEvent.click(screen.getByText("Close"));
    expect(setIsVisibile).toHaveBeenCalledTimes(1);
    const closeButton = screen.queryByText("Close")
    expect (closeButton).toBeNull;

  });

  test("calls axios.put with correct data when save button is clicked", async () => {
    const setIsModified = jest.fn();
    const setIsVisible = jest.fn();
    const setResetFields = jest.fn();
    const axiosPutMock = jest.spyOn(axios, "put");
  
    render(
      <EvaluationEdit
        subjectTitle="Math"
        title="Course"
        isModified={false}
        setIsModified={setIsModified}
        description="Exam"
        value={0.5}
        isVisible={true}
        setIsVisible={setIsVisible}
        resetFields={false}
        setResetFields={setResetFields}
      />
    );
  
    const descriptionInput = screen.getByLabelText("Description");
    fireEvent.change(descriptionInput, { target: { value: "New description" } });
  
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
  
    await waitForElementToBeRemoved(() => screen.getByText("Edit Course"));
  
    expect(axiosPutMock).toHaveBeenCalledTimes(1);
    expect(axiosPutMock).toHaveBeenCalledWith(
      "http://localhost:8090/api/v1/subjects/Math/evaluationMethods/component=Course",
      { component: "Course", description: "New description", value: 0.5 }
    );
    expect(setIsModified).toHaveBeenCalledTimes(1);
    expect(setIsVisible).toHaveBeenCalledTimes(1);
  });
  
  
