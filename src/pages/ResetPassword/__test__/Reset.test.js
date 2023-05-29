import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Reset from '../Reset';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');  // Mock-ul pentru axios

describe('Reset Component', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue({});  // Rezultatul mock-ului pentru cererea post a lui axios
    // Setează un token în localStorage
    
  });

  afterEach(() => {
    // Șterge tokenul după fiecare test
    localStorage.removeItem('token');
    window.history.pushState({}, '', '');
  });

  test('renders without crashing', () => {
    render(<MemoryRouter><Reset /></MemoryRouter>);
    expect(screen.getByText(/Reset your password!/i)).toBeInTheDocument();
  });

 


});
