import { render, fireEvent, screen, getByText } from "@testing-library/react";
import FormModal from "../FormModal";

describe("FormModal", () => {
  test("renders modal title", () => {
    render(
      <FormModal
        SubjectModal={true}
        setSubjectModal={() => {}}
        modalTitle="Add Subject"
        action="add"
        title=""
        description=""
        year={0}
        semester={0}
        credits={0}
        isModified={false}
        setIsModified={() => {}}
      />
    );
    const titleElement = screen.getByText("Add Subject");
    expect(titleElement).toBeInTheDocument();
  });

  test("should render the submit button", () => {
    const setIsModified = jest.fn();
    render(
      <FormModal
        SubjectModal={true}
        setSubjectModal={() => {}}
        modalTitle="Add Subject"
        action="add"
        title=""
        description=""
        year={0}
        semester={0}
        credits={0}
        isModified={false}
        setIsModified={setIsModified}
      />
    );
    const submitButton = screen.getByText("Submit");
    expect(submitButton).toBeInTheDocument();
  });

  test("submits the form data", async () => {
    const setIsModified = jest.fn();
    render(
      <FormModal
        SubjectModal={true}
        setSubjectModal={() => {}}
        modalTitle="Add Subject"
        action="add"
        title=""
        description=""
        year={0}
        semester={0}
        credits={0}
        isModified={false}
        setIsModified={setIsModified}
      />
    );
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const yearInput = screen.getByLabelText(/year/i);
    const semesterInput = screen.getByLabelText(/semester/i);
    const creditsInput = screen.getByLabelText(/credits/i);
    const submitButton = screen.getByText(/submit/i);

    fireEvent.change(titleInput, { target: { value: "Math" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Mathematics subject" },
    });
    fireEvent.change(yearInput, { target: { value: "1" } });
    fireEvent.change(semesterInput, { target: { value: "1" } });
    fireEvent.change(creditsInput, { target: { value: "6" } });
    fireEvent.click(submitButton);

    expect(setIsModified).toHaveBeenCalledTimes(0);
  });

  test("cancels the form data", async () => {
    const setIsModified = jest.fn();
    const setSubjectModal = jest.fn();
    render(
      <FormModal
        SubjectModal={true}
        setSubjectModal={setSubjectModal}
        modalTitle="Add Subject"
        action="add"
        title=""
        description=""
        year={0}
        semester={0}
        credits={0}
        isModified={false}
        setIsModified={setIsModified}
      />
    );
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const yearInput = screen.getByLabelText(/year/i);
    const semesterInput = screen.getByLabelText(/semester/i);
    const creditsInput = screen.getByLabelText(/credits/i);
    const cancelButton = screen.getByText(/cancel/i);

    fireEvent.change(titleInput, { target: { value: "Math" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Mathematics subject" },
    });
    fireEvent.change(yearInput, { target: { value: "1" } });
    fireEvent.change(semesterInput, { target: { value: "1" } });
    fireEvent.change(creditsInput, { target: { value: "6" } });
    fireEvent.click(cancelButton);

    expect(setSubjectModal).toHaveBeenCalledWith(false);
    expect(setIsModified).toHaveBeenCalledTimes(0);
  });
});
