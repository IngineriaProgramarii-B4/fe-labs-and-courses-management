// RemindersPage.tsx
import React from 'react';
import RemindersCard from './RemindersCard';
import RemindersContextProvider from './RemindersContext';

const RemindersPage: React.FC = () => {
  return (
    <RemindersContextProvider>
      <RemindersCard />
    </RemindersContextProvider>
  );
};

export default RemindersPage;
