import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../Register';
import { BrowserRouter as Router } from 'react-router-dom';
import { message } from 'antd';
import { rest } from 'msw';
import { setupServer } from 'msw/node';


jest.spyOn(message, 'success').mockImplementation(() => {});

afterEach(() => {
    message.success.mockRestore();
  });
  

jest.mock('antd', () => {
    const originalModule = jest.requireActual('antd');
  
    return {
      ...originalModule,
      message: {
        ...originalModule.message,
        success: jest.fn(),
        error: jest.fn(),
      },
    };
  });
  
jest.mock('@ant-design/icons/lib/components/IconFont', () => {
    return () => null;
  });

global.matchMedia = global.matchMedia || function () {
    return {
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
    };
};


test('should render welcome back title', () => {
    render(
        <Router>
            <Register />
        </Router>
    );
    const title = screen.getByText(/welcome back!/i);
    expect(title).toBeInTheDocument();
});

test('renders form with expected fields', () => {
    render(
        <Router>
            <Register />
        </Router>
    );
    const idField = screen.getByLabelText(/id/i);
    const emailField = screen.getByLabelText(/e-mail/i);
    const passwordField = screen.getByPlaceholderText(/please input your password!/i);
    const confirmPasswordField = screen.getByPlaceholderText(/please confirm your password!/i);
    const registerButton = screen.getByRole('button', { name: /register/i });
    const alreadyHaveAccount = screen.getByText(/already have an account?/i);
    const logIn = screen.getByRole('link', { name: 'Sign in' });
    expect(idField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(confirmPasswordField).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    expect(alreadyHaveAccount).toBeInTheDocument();
    expect(logIn).toHaveAttribute('href', '/login');
});

test('error message if the ID field is empty', async () => {
    render(
        <Router>
            <Register />
        </Router>
    );
    fireEvent.submit(screen.getByRole('button', { name: 'Register' }));
    await screen.findByText('Please input your ID!');
});

test('error message if the e-mail field is empty', async () => {
    render(
        <Router>
            <Register />
        </Router>
    );
    fireEvent.submit(screen.getByRole('button', { name: 'Register' }));
    await screen.findByText('Please input your E-mail!');
});

test(' error message if an invalid email is entered', async () => {
    render(
        <Router>
            <Register />
        </Router>
    );
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'invalid-email' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Register' }));
    await screen.findByText('The input is not valid E-mail!');
});

test('error message if the password field is empty', async () => {
    render(
        <Router>
            <Register />
        </Router>
    );
    fireEvent.submit(screen.getByRole('button', { name: 'Register' }));
    await screen.findByText('Please input your password!');
});

test('error message if the confirm password field is empty', async () => {
    render(
        <Router>
            <Register />
        </Router>
    );
    fireEvent.change(screen.getByPlaceholderText('Please confirm your password!'), { target: { value: 'password' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Register' }));
    await screen.getByPlaceholderText('Please confirm your password!');
});

test('error message when passwords do not match', async () => {
    render(
        <Router>
            <Register />
        </Router>
    );
    fireEvent.change(screen.getByPlaceholderText('Please input your password!'), { target: { value: 'password' } });
    fireEvent.change(screen.getByPlaceholderText('Please confirm your password!'), { target: { value: 'different_password' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Register' }));
    await screen.findByText('The two passwords that you entered do not match!');
});

//teste noi
test('error message if the password does not meet the required pattern', async () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    fireEvent.change(screen.getByPlaceholderText('Please input your password!'), { target: { value: 'weakpassword' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Register' }));
    await screen.findByText('The password must contain at least 8 characters, at least one digit, at least one special symbol and at least one capital letter');
  });
  
  //test nou
  const server = setupServer(
    rest.post('/api/v1/auth/register', (req, res, ctx) => {
      return res(ctx.status(200));
    })
  );
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test('should display error message if server returns an error', async () => {
    server.use(
      rest.post('/api/v1/auth/register', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Server Error' }));
      })
    );
  
    render(
      <Router>
        <Register />
      </Router>
    );
  
    fireEvent.change(screen.getByLabelText('ID'), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Test@1234' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'Test@1234' } });
  
    fireEvent.submit(screen.getByRole('button', { name: 'Register' }));
  
    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith('Registration failed: Network Error');
    });
  });

  
/*
  test('should navigate to login page after successful registration', async () => {
    const { container } = render(
      <Router>
        <Register />
      </Router>
    );
  
    

  
    fireEvent.change(screen.getByLabelText('ID'), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Test@1234' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'Test@1234' } });
  
    fireEvent.submit(screen.getByRole('button', { name: 'Register' }));
  
    await waitFor(() => {
      expect(container.querySelector('a[href="/login"]')).toBeInTheDocument();
    });
  });
*/

  // const server = setupServer(
  //   rest.post('/api/v1/auth/register', (req, res, ctx) => {
  //     return res(ctx.status(200));
  //   })
  // );
  
  // beforeAll(() => server.listen());
  // afterEach(() => server.resetHandlers());
  // afterAll(() => server.close());
