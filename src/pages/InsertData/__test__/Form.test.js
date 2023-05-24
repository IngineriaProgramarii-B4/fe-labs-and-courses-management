import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import FormInfo from '../Form';
import { Form } from 'antd';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');  // Mock-ul pentru axios

describe('FormInfo Component', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue({});  // Rezultatul mock-ului pentru cererea post a lui axios
    // Setează un token în localStorage
    localStorage.setItem('token', 'test-token');
  });

  afterEach(() => {
    // Șterge tokenul după fiecare test
    localStorage.removeItem('token');
  });

  test('renders without crashing', () => {
    render(<MemoryRouter><FormInfo /></MemoryRouter>);
    expect(screen.getByText(/Insert Data here/i)).toBeInTheDocument();
  });

  test('submits form with entered data', async () => {
    render(<MemoryRouter><FormInfo /></MemoryRouter>);

    // Simulează completarea câmpurilor formularului
    fireEvent.change(screen.getByPlaceholderText(/Registration Number.../i), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText(/First name.../i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Last name.../i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Role.../i), { target: { value: 'STUDENT' } });

    // Simulează trimiterea formularului
    fireEvent.click(screen.getByText(/Submit/i));

    // Așteptă să se cheme axios.post
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    // Verifică dacă datele trimise sunt corecte
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8082/api/v1/secretary',
      {
        registrationNumber: '123',
        firstname: 'John',
        lastname: 'Doe',
        role: 'STUDENT' // Aici se așteaptă 'Admin', nu 'STUDENT', pentru a coincide cu valoarea introdusă în formular
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  });
});

/*
test('handles file upload', () => {
    const file = new File(['registrationNumber,firstname,lastname,role\n123,John,Doe,STUDENT'], 'test.csv', { type: 'text/csv' });
    const fileInput = screen.getByLabelText(/file upload/i);
  
    fireEvent.change(fileInput, { target: { files: [file] } });
  
    expect(Papa.parse).toHaveBeenCalledWith(file, expect.any(Object));
    expect(setData).toHaveBeenCalledWith([{ registrationNumber: '123', firstname: 'John', lastname: 'Doe', role: 'STUDENT' }]);
  });*/