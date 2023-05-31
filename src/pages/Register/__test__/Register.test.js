import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Register from '../Register';
import api from '../../../services/api';
import {createMemoryHistory} from 'history';


jest.mock("../../../services/api");
jest.setTimeout(10000);  // Sets timeout to 10 seconds for all tests in this file

describe("Register component", () => {
  let history;
  beforeEach(() => {
    history = createMemoryHistory();
    history.push = jest.fn();
    render(
      <MemoryRouter initialEntries={['/start']}>
        <Register />
      </MemoryRouter>
    );
  });

  test('renders form with expected fields and links', () => {
    const IDField = screen.getByPlaceholderText(/Please input your ID/i);
    const emailField = screen.getByPlaceholderText(/Please input your E-mail!/i);
    const passwordField = screen.getByPlaceholderText(/Please input your password!/i);
    const confirmField = screen.getByPlaceholderText(/Please confirm your password!/i);
    const registerButton = screen.getByRole('button', { name: /Register/i });
    const loginLink = screen.getByRole('link', { name: /Log in/i });
    const forgotPasswordLink = screen.getByRole('link', { name: /Forgot password?/i });

    expect(IDField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(confirmField).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', 'http://localhost:3000/login');
    expect(forgotPasswordLink).toHaveAttribute('href', 'http://localhost:3000/sendMail');
  });

  test('form validation works as expected', async () => {
    const registerButton = screen.getByRole('button', { name: /Register/i });
    
    fireEvent.click(registerButton);

    expect(await screen.findByText(/Please input your ID!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please input your E-mail!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please input your password!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please confirm your password!/i)).toBeInTheDocument();
const passwordField = screen.getByPlaceholderText(/Please input your password!/i);
    const confirmField = screen.getByPlaceholderText(/Please confirm your password!/i);

    userEvent.type(passwordField, 'simple');
    userEvent.type(confirmField, 'simple');
    userEvent.click(registerButton);

    expect(await screen.findByText(/The password must contain at least 8 characters, at least one digit, at least one special symbol and at least one capital letter!/i)).toBeInTheDocument();
  });

  test('form submit calls api post with correct data and navigates to login page on success', async () => {
    const IDField = screen.getByPlaceholderText(/Please input your ID/i);
    const emailField = screen.getByPlaceholderText(/Please input your E-mail!/i);
    const passwordField = screen.getByPlaceholderText(/Please input your password!/i);
    const confirmField = screen.getByPlaceholderText(/Please confirm your password!/i);
    const registerButton = screen.getByRole('button', { name: /Register/i });

    api.post.mockResolvedValueOnce({ status: 201 });

    fireEvent.change(IDField, { target: { value: 'testID' } });
    fireEvent.change(emailField, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordField, { target: { value: 'Password123!' } });
    fireEvent.change(confirmField, { target: { value: 'Password123!' } });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/api/v1/auth/register', {
        userId: 'testID',
        email: 'test@test.com',
        password: 'Password123!',
      });
    });

    expect(history.push).toHaveBeenCalledWith("/login");
  });

  test('api failure displays error toast', async () => {
    const registerButton = screen.getByRole('button', { name: /Register/i });
    
    api.post.mockRejectedValueOnce(new Error('Registration failed'));

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText('Registration failed')).toBeInTheDocument();
    });
  });
test('password confirmation mismatch shows error', async () => {
    const passwordField = screen.getByPlaceholderText(/Please input your password!/i);
    const confirmField = screen.getByPlaceholderText(/Please confirm your password!/i);
    const registerButton = screen.getByRole('button', { name: /Register/i });

    userEvent.type(passwordField, 'Password123!');
    userEvent.type(confirmField, 'differentPassword123!');
    userEvent.click(registerButton);

    expect(await screen.findByText('The two passwords that you entered do not match!')).toBeInTheDocument();
  });
});