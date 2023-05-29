import {render, screen, fireEvent,waitFor } from '@testing-library/react';
import Login from '../Login';
import {BrowserRouter as Router} from 'react-router-dom';
import api from '../../../services/api';
import React from 'react';


global.matchMedia = global.matchMedia || function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };
//test nou
  test('check register button functionality', () => {
    render(<Router><Login /></Router>);
    const registerButton = screen.getByRole('button', { name: /register/i });
    // eslint-disable-next-line testing-library/no-node-access
    const registerLink = registerButton.querySelector('a');
  
    expect(registerButton).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', 'http://localhost:3000/register');
  });

  //test nou
 
  
  
  //test nou
  test('validate password input', async () => {
    render(<Router><Login /></Router>);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });
  
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(loginButton);
  
    const passwordError = await screen.findByText(/please enter your password/i);
    expect(passwordError).toBeInTheDocument();
  });
  
  
  
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
    

    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(forgotPassword).toHaveAttribute('href', 'http://localhost:3000/sendMail');
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

  jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
  
    return {
      ...originalModule,
      useNavigate: jest.fn(),
    };
  });
  test('redirect to home if user is authenticated', () => {
    const navigateSpy = jest.fn();
    const useNavigate = require('react-router-dom').useNavigate;
    useNavigate.mockReturnValue(navigateSpy);
  
    localStorage.setItem('token', 'fake-jwt-token');
  
    render(<Router><Login /></Router>);
  
    expect(navigateSpy).toHaveBeenCalledWith('/Home');
    localStorage.removeItem('token');
    useNavigate.mockRestore();
  });
  
  test('no redirect if user is not authenticated', () => {
    const navigateSpy = jest.fn();
    const useNavigate = require('react-router-dom').useNavigate;
    useNavigate.mockReturnValue(navigateSpy);
  
    localStorage.removeItem('token');
  
    render(<Router><Login /></Router>);
  
    expect(navigateSpy).not.toHaveBeenCalledWith('/Home');
    useNavigate.mockRestore();
  });

  

  test('should handle login failure without token', async () => {
    const apiPostSpy = jest.spyOn(api, 'post').mockResolvedValueOnce({ data: {} });
  
    render(<Router><Login /></Router>);
  
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test@test.com' },
    });
  
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'password' },
    });
  
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
    await waitFor(() => expect(apiPostSpy).toHaveBeenCalledTimes(1));
  
    expect(apiPostSpy).toHaveBeenCalledWith('/api/v1/auth/login', {
      email: 'test@test.com',
      password: 'password',
    });
  
    apiPostSpy.mockRestore();
  });

  
  