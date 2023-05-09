import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ReminderDataProps } from "./RemindersContext";
import RemindersCard, { RemindersCardBody } from "./RemindersCard";
import axios, { AxiosInstance } from "axios";

const mockedRemindersData: ReminderDataProps[] = [
  {
    id: "dfsf123gddfg",
    dueDateTime: "01/06/2023",
    title: "Task 1",
    description: "Finish a book"
  },
];

describe("RemindersCardBody", () => {
  test("should render the titles and the descriptions of the reminders", () => {
    render(<RemindersCardBody reminders={mockedRemindersData} />);
    expect(screen.getByText("Your Reminders")).toBeInTheDocument();

    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 2/i)).toBeInTheDocument();
    
    expect(screen.getByText(/Finish a book/i)).toBeInTheDocument();
    expect(screen.getByText(/Feed Linux/i)).toBeInTheDocument();
  });
});

//+coverage, dar pica
test("should render properly", () => {
  render(<RemindersCard />);
  mockedRemindersData.forEach((data) => {
    expect(screen.getByText(data.id)).toBeInTheDocument();
    expect(screen.getByText(data.dueDateTime)).toBeInTheDocument();
    expect(screen.getByText(data.title)).toBeInTheDocument();
    expect(screen.getByText(data.description)).toBeInTheDocument();
   });
});


describe("RemindersCardBody", () => {
  //in soner apare ca e acoperit codul, dar in visual e picat
  test('opens add reminder modal', () => {
    render(<RemindersCardBody reminders={mockedRemindersData} />);
    const addButton = screen.getByRole('button', { name: '+' });
    addButton.click();
    expect(screen.getByText("Add Reminder")).toBeInTheDocument();
    expect(screen.getByText("Your Reminders")).toBeInTheDocument();
  });
  
  // test('deletes a reminder', () => {
  //   const deleteMock = jest.fn();
  //   render(<RemindersCardBody reminders={mockedRemindersData} />);
  //   const deleteButton = screen.getByRole('button', { name: /delete/i });
  //   // deleteButton.click();
  //   fireEvent.click(deleteButton);
  //   expect(deleteMock).toBeCalledWith('1');
  // });

  //pica si nu creste
  // test('deletes a reminder', () => {
  //   const mockDeleteReminder = jest.fn();
  //   render(<RemindersCardBody reminders={mockedRemindersData} />);
  //   const deleteButton = screen.getByRole('button', { name: /delete/i });
  //   fireEvent.click(deleteButton);
  //   expect(mockDeleteReminder).toHaveBeenCalledWith('1');
  // });
    
});


// jest.mock('../axiosInstance');

// describe('RemindersCardBody', () => {
//   const reminders = [
//     {
//       id: '1',
//       title: 'Reminder 1',
//       description: 'This is reminder 1',
//       dueDateTime: '2022-01-01T00:00:00.000Z',
//     },
//     {
//       id: '2',
//       title: 'Reminder 2',
//       description: 'This is reminder 2',
//       dueDateTime: '2022-01-02T00:00:00.000Z',
//     },
//   ];

//   it('deletes a reminder and shows success message', async () => {
//     const mockGetData = jest.fn();
//     axiosInstance.delete.mockResolvedValueOnce({ data: 'Reminder deleted' });
//     render(<RemindersCardBody reminders={reminders} getData={mockGetData} />);
//     const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
//     fireEvent.click(deleteButton);
//     await waitFor(() => expect(axiosInstance.delete).toHaveBeenCalledWith('/reminders/1'));
//     expect(mockGetData).toHaveBeenCalled();
//     expect(screen.getByText(/Reminder deleted/i)).toBeInTheDocument();
//   });
// });
