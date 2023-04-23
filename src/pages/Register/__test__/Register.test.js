import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../Register';
import { BrowserRouter as Router } from 'react-router-dom';

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
    const passwordField = screen.getByLabelText(/parola/i);
    const confirmPasswordField = screen.getByLabelText(/confirma/i);
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
    fireEvent.change(screen.getByLabelText('Parola'), { target: { value: 'password' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Register' }));
    await screen.findByText('Please confirm your password!');
});

// test('success message and redirect to the login page when registration is successful', async () => {
//     const mockApiPost = jest.spyOn(api, 'post').mockResolvedValue({ status: 200 });
//     const mockNavigate = jest.fn();
//     jest.mock('react-router-dom', () => ({
//       useNavigate: () => mockNavigate,
//     }));
//     render(
//         <Router>
//             <Register />
//         </Router>
//     );
//     fireEvent.change(screen.getByLabelText('ID'), { target: { value: '123' } });
//     fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'test@example.com' } });
//     fireEvent.change(screen.getByLabelText('Parola'), { target: { value: 'password' } });
//     fireEvent.change(screen.getByLabelText('Confirma'), { target: { value: 'password' }});
// });

