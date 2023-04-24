import {render, screen, fireEvent,waitFor } from '@testing-library/react';
import Login from '../Login';
import {BrowserRouter as Router} from 'react-router-dom';
import api from '../api';

global.matchMedia = global.matchMedia || function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

  test ('should render welcome back title', () => {
    render(
        <Router>
            <Login />
        </Router>
    );
    const title = screen.getByText(/welcome back!/i);
    expect(title).toBeInTheDocument();
});

test('renders form with expected fields', () => {
    render(
        <Router>
            <Login />
        </Router>
    );
    const emailField = screen.getByPlaceholderText(/enter your email/i);
    const passwordField = screen.getByPlaceholderText(/enter your password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });
    const forgotPassword = screen.getByRole('link', { name: /Forgot password?/i });
    const rememberMe = screen.getByText(/remember me/i);

    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(rememberMe).toBeInTheDocument();
    expect(forgotPassword).toHaveAttribute('href', 'http://localhost:3000/resetPassword');
  });
// Testează validarea input-ului de email
test('validate email input', async () => {
    render(<Router><Login /></Router>);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const loginButton = screen.getByRole('button', { name: /login/i });
  
    fireEvent.change(emailInput, { target: { value: 'notAnEmail' } });
    fireEvent.click(loginButton);
  
    const emailError = await screen.findByText(/please enter valid email/i);
    expect(emailError).toBeInTheDocument();
  });
  const localStorageMock = {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
  };
  global.localStorage = localStorageMock;

  test('store JWT token in local storage', async () => {
    // create a spy for localStorage.setItem
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
  
    // Create a mock for `api.post`
    const apiPostSpy = jest.spyOn(api, 'post').mockResolvedValue({
      data: {
        accessToken: 'fake-jwt-token',
      },
    });
  
    render(<Router><Login /></Router>);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });
  
    // Completează și trimite formularul
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.click(loginButton);
  
    // Așteaptă ca mock-ul să fie apelat
    await waitFor(() => expect(apiPostSpy).toHaveBeenCalledTimes(1));
  
    // Verifică dacă tokenul JWT a fost stocat în local storage
    expect(setItemSpy).toHaveBeenCalledWith('token', 'fake-jwt-token');
  
    // Curăță mock-urile
    apiPostSpy.mockRestore();
    setItemSpy.mockRestore();
  });
  
  