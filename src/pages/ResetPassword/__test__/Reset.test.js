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

  test('shows error message when the request fails', async () => {
    // Make the axios post request fail
    axios.post.mockRejectedValue(new Error('Error'));

    render(<MemoryRouter initialEntries={['/reset?token=test-token']}><Reset /></MemoryRouter>);

    const newPasswordInput = screen.getByPlaceholderText('Enter your new password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm your new password');
    const resetButton = screen.getByText('Reset Password');

    fireEvent.change(newPasswordInput, { target: { value: 'Test@1234' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Test@1234' } });

    fireEvent.click(resetButton);

    // Wait for the error message to appear
    const errorMessage = await screen.findByText('Reset Failed');

    expect(errorMessage).toBeInTheDocument();
  });


});
