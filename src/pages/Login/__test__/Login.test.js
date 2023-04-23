import {render, screen, fireEvent} from '@testing-library/react';
import Login from '../Login';
import {BrowserRouter as Router} from 'react-router-dom';
import { log } from 'console';

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
    const rememberMe = screen. getByText(/remember me/i);

    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(rememberMe).toBeInTheDocument();
    expect(forgotPassword).toHaveAttribute('href', 'http://localhost:3000/resetPassword');
  });

  // test('validate email input', async () => {
  //   const { getByPlaceholderText, getByText } = render(<Router> <Login /> </Router>);
  //   const emailInput = getByPlaceholderText('Enter your email');

  //   fireEvent.change(emailInput, { target: { value: 'notAnEmail' } });
  //   fireEvent.click(getByText('Login'));
  //   expect(getByText('Please enter valid email')).toBeInTheDocument();
  // });

  // test('validate password input', async () => {
  //   const { getByPlaceholderText, getByText } = render(<Router> <Login /> </Router>);
  //   const passwordInput = getByPlaceholderText('Enter your password');

  //   fireEvent.change(passwordInput, { target: { value: '' } });
  //   fireEvent.click(getByText('Login'));

  //   await waitFor(() => {
  //     expect(getByText('Please enter your password')).toBeInTheDocument();
  //   });
  // });