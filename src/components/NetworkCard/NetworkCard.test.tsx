import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import NetworkCard, { UserDataType } from './NetworkCard';

describe('NetworkCard', () => {
  let mockAxios: MockAdapter;

  const mockUsers: UserDataType[] = [
    {
      email: 'diana.cuzic@gmail.com',
      firstName: 'Diana',
      lastName: 'Cuzic',
      username: 'dianacuzic',
      office: 'P1',
      department: 'Secretary',
    },
    {
      email: 'stefan.ciobaca@uaic.com',
      firstName: 'Stefan',
      lastName: 'Ciobaca',
      username: 'stefan.ciobaca',
      title: 'Prof',
      taughtSubjects: ['PA', 'PF', 'Logica'],
    },
    {
      email: 'florin.eugen@uaic.ro',
      firstName: 'Florin',
      lastName: 'Rotaru',
      username: 'florin02',
      year: 2,
      semester: 4,
      registrationNumber: '123FAKE92929',
      enrolledCourses: ['IP', 'PA', 'SGBD', 'TW', 'SE'],
    },
  ];

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('renders a list of user cards', async () => {
    mockAxios.onGet('http://localhost:8080/api/v1/users').reply(200, mockUsers);

    render(<NetworkCard />);

    const userCards = await screen.findAllByRole('article');

    expect(userCards).toHaveLength(mockUsers.length);
  });

  it('renders an error message when the API request fails with a 404', async () => {
    mockAxios.onGet('http://localhost:8080/api/v1/users').reply(404);

    render(<NetworkCard />);

    const errorMessage = await screen.findByText(/404/i);

    expect(errorMessage).toBeInTheDocument();
  });
});