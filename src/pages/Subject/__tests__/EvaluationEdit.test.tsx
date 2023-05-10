import { render, waitForElementToBeRemoved } from "@testing-library/react";
import EvaluationEdit from "../EvaluationEdit";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";

jest.mock("axios");

describe("FileTransfer component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls the onCancel function and updates state correctly", () => {
    const setIsVisible = jest.fn();
    const setResetFields = jest.fn();

    render(
      <EvaluationEdit
        subjectTitle="Math"
        title="Course"
        isModified={false}
        setIsModified={() => {}}
        description="Exam"
        value={0.5}
        isVisible={true}
        setIsVisible={setIsVisible}
        resetFields={false}
        setResetFields={setResetFields}
      />
    );

    const cancelButton = screen.getByText("Close");
    fireEvent.click(cancelButton);

    expect(setIsVisible).toHaveBeenCalledWith(false);
    expect(setResetFields).toHaveBeenCalledWith(true);
  });

  it("calls axios.put with correct data when save button is clicked", async () => {
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
  
    //await waitForElementToBeRemoved(() => screen.getByText("Edit Course"));
  
    await waitFor(() => expect(axiosPutMock).toHaveBeenCalledTimes(1));
    expect(axiosPutMock).toHaveBeenCalledWith(
      "http://localhost:8090/api/v1/subjects/Math/evaluationMethods/component=Course",
      { component: "Course", description: "New description", value: 0.5 }
    );
    expect(setIsModified).toHaveBeenCalledTimes(1);
    expect(setIsVisible).toHaveBeenCalledTimes(1);
    axiosPutMock.mockRestore(); // restore the original `axios.put()` method
  });

  it("logs an error message when axios.put throws an error", async () => {
    const setIsModified = jest.fn();
    const setIsVisible = jest.fn();
    const setResetFields = jest.fn();
    const axiosPutMock = jest.spyOn(axios, "put").mockRejectedValue(new Error("Mock error"));
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  
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
      
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
  
    await waitFor(() => expect(axiosPutMock).toHaveBeenCalledTimes(1));
    expect(axiosPutMock).toHaveBeenCalledWith(
      "http://localhost:8090/api/v1/subjects/Math/evaluationMethods/component=Course",
      { component: "Course", description: "Exam", value: 0.5 }
    );
    expect(setIsModified).not.toHaveBeenCalled();
    expect(setIsVisible).not.toHaveBeenCalled();
    expect(setResetFields).not.toHaveBeenCalled();
    expect(screen.queryByText("Edit Course")).toBeInTheDocument();
  
    axiosPutMock.mockRestore();
    consoleSpy.mockRestore();
  });

});