import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SendMail from '../SendMail';
import { sendResetEmail } from '../../../services/api';
import axios from 'axios';

jest.mock('../../../services/api');

describe('SendMail Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <SendMail />
      </Router>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('submits form with entered data', async () => {
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const resetButton = screen.getByText('Reset Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(resetButton);

    // Wait for sendResetEmail to be called
    await waitFor(() => expect(sendResetEmail).toHaveBeenCalledTimes(1));

    // Check if the sent data is correct
    expect(sendResetEmail).toHaveBeenCalledWith('test@example.com');
  });
});
